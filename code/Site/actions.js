/**
 * main action
 */
function main_action() {
   if (this.allstories.size() == 0) {
      res.data.body = this.renderSkinAsString("welcome");
      if (session.user) {
         if (session.user == this.creator)
            res.data.body += this.renderSkinAsString("welcomeowner");
         if (session.user.sysadmin)
            res.data.body += this.renderSkinAsString("welcomesysadmin");
      }
   } else {
      this.renderStorylist(req.data.day);
      res.data.body = this.renderSkinAsString("main");
   }
   res.data.title = this.title;
   this.renderSkin("page");
   logAccess();
   return;
}

/**
 * edit action
 */
function edit_action() {
   if (req.data.cancel)
      res.redirect(this.href());
   else if (req.data.save) {
      try {
         res.message = this.evalPreferences(req.data, session.user);
         res.redirect(this.href("edit"));
      } catch (err) {
         res.message = err.toString();
      }
   }

   res.data.action = this.href(req.action);
   res.data.title = getMessage("Site.preferencesTitle", {siteTitle: this.title});
   res.data.body = this.renderSkinAsString("edit");
   this.renderSkin("page");
   return;
}


/**
 * delete action
 */
function delete_action() {
   if (req.data.cancel)
      res.redirect(this.href());
   else if (req.data.remove) {
      try {
         res.message = root.deleteSite(this);
         res.redirect(root.href());
      } catch (err) {
         res.message = err.toString();
      }
   }

   res.data.action = this.href(req.action);
   res.data.title = getMessage("Site.deleteTitle");
   var skinParam = {
      description: getMessage("Site.deleteDescription"),
      detail: this.title
   };
   res.data.body = this.renderSkinAsString("delete", skinParam);
   this.renderSkin("page");
   return;
}


/**
 * wrapper to access colorpicker also from site
 */

function colorpicker_action() {
   res.handlers.site = this;
   root.colorpicker_action();
   return;
}


/**
 * wrapper to make style.skin public
 */
function main_css_action() {
   res.dependsOn(this.modifytime);
   res.dependsOn(res.handlers.layout.modifytime);
   res.dependsOn(res.handlers.layout.skins.getSkinSource("Site", "style"));
   res.digest();
   res.contentType = "text/css";
   this.renderSkin("style");
   return;
}

/**
 * wrapper to make javascript.skin public
 */
function main_js_action() {
   res.dependsOn(this.modifytime);
   res.dependsOn(res.handlers.layout.modifytime);
   res.dependsOn(res.handlers.layout.skins.getSkinSource("Site", "javascript"));
   res.digest();
   res.contentType = "text/javascript";
   this.renderSkin("javascript");
   root.renderSkin("systemscripts");
   return;
}

/**
 * wrapper for rss feed
 */
function rss_xml_action() {
   res.redirect(root.href("rss"));
   return;
}

/**
 * rss feed
 */
function rss_action() {
   res.contentType = "text/xml";
   res.dependsOn(this.lastupdate);
   res.digest();

   var now = new Date();
   var systitle = root.getTitle();
   var sdf = new java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
   sdf.setTimeZone(new java.util.SimpleTimeZone(0, "UTC"));

   var collection, subtitle;
   switch (true) {
      case (req.data.show == "all") :
         collection = this.allcontent;
         subtitle = "with comments";
         break;
      // FIXME: i don't think a day makes much sense as rss output [tobi]
      case (req.data.day != null) :
         collection = this.get(req.data.day);
         subtitle = req.data.day;
         break;
      case (req.data.topic != null) :
         collection = this.topics.get(req.data.topic);
         subtitle = req.data.topic;
         break;
      default :
         collection = this.allstories;
   }
   var size = (collection != null) ? collection.size() : 0;

   var max = req.data.max ? parseInt(req.data.max) : 7;
   max = Math.min(max, size);
   max = Math.min(max, 10);

   var item = {};
   if (max > 0 && this.online) {
      var items = new java.lang.StringBuffer();
      var resources = new java.lang.StringBuffer();
      collection.prefetchChildren(0, max);
      for (var i=0; i<max; i++) {
         var story = collection.get(i);
         var item = {
            url: story.href(),
            title: story.getRenderedContentPart("title").clip(50),
            text: story.getRenderedContentPart("text").clip(500),
            publisher: systitle,
            creator: story.creator.name,
            date: sdf.format(story.createtime),
            subject: story.topic ? story.topic : "",
            year: story.createtime.getFullYear()
         };
         if (story.creator.publishemail)
            item.email = story.creator.email.entitize();
         if (!item.title) {
            // shit happens: if a content part contains a markup
            // element only, String.clip() will return nothing...
            if (!item.text)
               item.title = "...";
            else
               item.title = story.getRenderedContentPart("text").clip(25);
         }
         items.append(story.renderSkinAsString("rssItem", item));
         resources.append(story.renderSkinAsString("rssResource", item));
      }

      var site = {
         subtitle: subtitle,
         url: this.href(),
         title: systitle,
         creator: this.creator.name,
         year: now.getFullYear(),
         lastupdate: max > 0 ? sdf.format(this.lastUpdate): sdf.format(this.createtime),
         items: items.toString(),
         resources: resources.toString()
      };
      if (this.email)
         site.email = this.email.entitize();
      else if (this.creator.publishemail)
         site.email = this.creator.email.entitize();
      this.renderSkin("rss", site);
   }
   return;
}

/**
 * this action tries to get a file with the given name
 * if it finds it, it increases the request-counter of this file
 * sets the appropriate mimetype and redirects the browser to the file
 */
function getfile_action() {
   var f = this.files.get(req.data.name);
   if (f) {
      f.requestcnt++;
      res.contentType = f.mimetype;
      res.redirect(f.getUrl());
   } else {
      res.message = getMessage("error.fileNotFound", req.data.name);
      res.redirect(this.href());
   }
   return;
}

/**
 * most read stories of a site
 */
function mostread_action() {
   res.data.title = getMessage("Site.mostReadTitle", {siteTitle: this.title});
   res.data.body = this.renderSkinAsString("mostread");
   this.renderSkin("page");
   return;
}

/**
 * referrers of a site
 */
function referrers_action() {
   if (req.data.permanent && session.user) {
      try {
         // FIXME: unfortunately, the check* methods are
         // not very handy, anymore... (need try/catch block)
         this.checkEdit(session.user, req.data.memberlevel);
      } catch (err) {
         res.message = err.toString();
         res.redirect(this.href());
         return;
      }
      var urls = req.data.permanent_array ?
                 req.data.permanent_array : [req.data.permanent];
      res.push();
      res.write(this.preferences.getProperty("spamfilter"));
      for (var i in urls) {
         res.write("\n");
         res.write(urls[i]);
      }
      this.preferences.setProperty("spamfilter", res.pop());
      res.redirect(this.href(req.action));
      return;
   }
   res.data.action = this.href("referrers");
   res.data.title = getMessage("Site.referrersReadTitle", {siteTitle: this.title});
   res.data.body = this.renderSkinAsString("referrers");
   this.renderSkin("page");
   return;
}

/**
 * search action
 */
function search_action() {
   res.data.action = this.href(req.action);
   res.data.title = "Search " + this.title;
   res.data.body = this.renderSkinAsString("searchform");

   if (req.data.q) {
      var query = stripTags(req.data.q);
      // array with sites to search
      var sites = new Array (this);
      var result = root.searchSites (query, this._id);
      var found = result.length;
      if (found == 0)
         res.data.body += getMessage("error.searchNothingFound", query);
      else {
         var start = 0;
         var end = found;

         if (found == 1)
            res.data.body += getMessage("confirm.resultOne", query);
         else if (found <= 10)
            res.data.body += getMessage("confirm.resultMany", [encodeForm(query), found]);
         else {
            if (req.data.start)
               start = Math.min (found-1, parseInt (req.data.start));
            if (isNaN (start))
               start = 0;
            end = Math.min (found, start+10);
            res.data.body += getMessage("confirm.resultMany", [encodeForm(query), found]);
            res.data.body += " " + getMessage("confirm.resultDisplay", [start+1, end]);
         }

         res.data.body += "<br />";

         // note: I'm doing this without a "searchbody" skin, since
         // I think there's not much need to customize the body of
         // search results, esp. since its parts are fully customizable.
         // of course, I may be wrong about that.

         // render prev links, if necessary
         if (start > 0) {
            var sp = new Object();
            sp.url = this.href() + "search?q=" + escape(query)+"&start=" + Math.max(0, start-10);
            sp.text = "previous results";
            res.data.body += "<br /><br />" + renderSkinAsString("prevpagelink", sp);
         }

         // render result
         for (var i=start; i<end; i++) {
            var site = root.get(result[i].sitealias);
            var item = site.allcontent.get(result[i].sid);
            if (item)
               res.data.body += item.renderSkinAsString("searchview");
         }

         // render next links, if necessary
         if (end < found) {
            var sp = new Object();
            sp.url = this.href() + "search?q=" + escape(query) + "&start=" + Math.min(found-1, start+10);
            sp.text = "next results";
            res.data.body += renderSkinAsString("nextpagelink", sp);
         }
      }
   }
   this.renderSkin("page");
   return;
}


/**
 * subscribe action
 */
function subscribe_action() {
   // create a new member-object and add it to membership-mountpoint
   this.members.add(new Membership(session.user));
   res.message = new Message("subscriptionCreate", this.title);
   res.redirect(this.href());
   return;
}

/**
 * unsubscribe action
 */
function unsubscribe_action() {
   if (req.data.cancel)
      res.redirect(this.members.href("subscriptions"));
   else if (req.data.remove) {
      try {
         res.message = this.members.deleteMembership(this.members.get(session.user.name), session.user);
         res.redirect(this.members.href("subscriptions"));
      } catch (err) {
         res.message = err.toString();
      }
   }

   res.data.title = getMessage("Site.subscription.deleteTitle", {siteTitle: this.title});
   var skinParam = {
      description: getMessage("Site.subscription.deleteDescription"),
      details: this.title
   };
   res.data.body = this.renderSkinAsString("delete", skinParam);
   this.renderSkin("page");
   return;
}

/**
 * context menu extension
 */
function menuext_action() {
   this.renderSkin("menuext");
   return;
}

/**
 * context menu extension (accessible as /menuext.reg)
 */
function menuext_reg_action() {
   res.contentType = "text/plain";
   this.renderSkin("menuext.reg");
   return;
}

/**
 * robots.txt action
 */
function robots_txt_action() {
   res.contentType = "text/plain";
   this.renderSkin("robots");
   return;
}
