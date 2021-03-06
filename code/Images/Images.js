// The Antville Project
// http://code.google.com/p/antville
//
// Copyright 2007-2011 by Tobi Schäfer.
//
// Copyright 2001–2007 Robert Gaggl, Hannes Wallnöfer, Tobi Schäfer,
// Matthias & Michael Platzer, Christoph Lincke.
//
// Licensed under the Apache License, Version 2.0 (the ``License'');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an ``AS IS'' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// $Revision$
// $Author$
// $Date$
// $URL$

/**
 * @fileOverview Defines the Images prototype
 */

markgettext("Images");
markgettext("images");

/**
 * @name Images
 * @constructor
 * @property {Image} _children
 * @property {Tag[]} alphabeticalGalleries 
 * @property {Tag[]} galleries
 * @property {Tag[]} otherGalleries
 * @extends HopObject
 */

/**
 * 
 * @param {String} action
 * @returns {Boolean}
 */
Images.prototype.getPermission = function(action) {
   if (!this._parent.getPermission("main")) {
      return false;
   }
   switch (action) {
      case ".":
      case "main":
      case "create":
      // FIXME: case "tags":
      return Site.require(Site.OPEN) && session.user ||
            Membership.require(Membership.CONTRIBUTOR) ||
            User.require(User.PRIVILEGED);
      case "all":
      return this._parent.constructor !== Layout &&
            (Membership.require(Membership.MANAGER) ||
            User.require(User.PRIVILEGED));
   }
   return false;
}

Images.prototype.main_action = function() {
   var images, skin;
   switch (this._parent.constructor) {
      case Root:
      case Site:
      images = User.getMembership().images;
      skin = "$Images#main";
      res.data.title = gettext("Member Images");
      break;
      
      case Layout:
      images = res.handlers.layout.images;
      skin = "$Images#layout";
      res.data.title = gettext("Layout Images");
      break;
   }
   res.data.list = renderList(images, "$Image#listItem", 
         10, req.queryParams.page);
   res.data.pager = renderPager(images, 
         this.href(req.action), 10, req.queryParams.page);
   res.data.body = this.renderSkinAsString(skin);
   res.handlers.site.renderSkin("Site#page");
   return;
}

Images.prototype.create_action = function() {
   File.redirectOnUploadError(this.href(req.action));
   File.redirectOnExceededQuota(this.href());

   if (req.data.save) {
      try {
         var image = Image.add(req.params, this._parent);
         image.notify(req.action);
         JSON.sendPaddedResponse(image._id);
         res.message = gettext('The image was successfully added.');
         res.redirect(image.href());
      } catch (ex) {
         JSON.sendPaddedResponse(null);
         res.status = 400;
         res.message = ex.toString();
         app.log(ex);
      }
   }

   res.data.action = this.href(req.action);
   res.data.title = gettext("Add Image");
   HopObject.confirmConstructor(Image);
   res.data.body = (new Image).renderSkinAsString("$Image#edit");
   res.handlers.site.renderSkin("Site#page");
   return;
}

Images.prototype.all_action = function() {
   res.data.pager = renderPager(this, this.href(req.action), 
         10, req.queryParams.page);
   res.data.list = renderList(this, "$Image#listItem", 
         10, req.queryParams.page);
   res.data.title = gettext("All Images");
   res.data.body = this.renderSkinAsString("$Images#main");
   res.handlers.site.renderSkin("Site#page");
   return;
}

/**
 * @namespace
 * @field
 */
Images.Default = new function() {
   var Image = function(name, description) {
      var dir = new helma.File(app.appsProperties['static'], "www");
      var image = new helma.Image(new helma.File(dir, name));
      this.__defineGetter__('parent', function() {return root});
      this.name = this.fileName = name;
      this.description = description;
      this.width = image.width;
      this.height = image.height;
      this.getUrl = function() {
         // Cannot use global.Image.getUrl() here because these images are 
         // located in the top-level of the static directory.
         return root.getStaticUrl(name);
      }
      this.render_macro = global.Image.prototype.render_macro;
      this.thumbnail_macro = global.Image.prototype.thumbnail_macro;
      return this;
   }

   var images = {};
   var add = function(name, description) {
      images[name] = new Image(name, description);
      return;
   }

   add("ant.png", "Ant");
   add("ant-icon.png", "Tiny Ant");
   add("big.gif", String.EMPTY);
   add("bullet.gif", "*");
   add("dot.gif", String.EMPTY);
   add("headbg.gif", String.EMPTY);
   add("helma.png", "Helma Object Publisher");
   add("hop.gif", "Helma Object Publisher");
   add("manage.gif", "manage");
   add("marquee.gif", String.EMPTY);
   add("menu.gif", "menu");
   add("pixel.gif", String.EMPTY);
   add("recent.gif", "recent");
   add("rss.png", "RSS feed");
   add("smallanim.gif", "Made with Antville");
   add("smallchaos.gif", "Made with Antville");
   add("smallstraight.gif", "Made with Antville");
   add("smalltrans.gif", "Made with Antville");
   add("status.gif", "status");
   add("webloghead.gif", "Antville");
   add("xmlbutton.gif", "XML version of this page");
   return images;
}

/**
 * @returns {Image[]}
 */
Images.prototype.mergeImages = function() {
   var images = [];
   var layout = this._parent;
   while (layout) {
      layout.images.forEach(function() {
         if (images.indexOf(this) < 0) {
            images.push(this);
         }
         return;
      });
      layout = layout.parent;
   }
   return images.sort(Number.Sorter("created", Number.Sorter.DESC));
}

/**
 * 
 * @param {String} group
 * @returns {Tag[]}
 * @see Site#getTags
 */
Images.prototype.getTags = function(group) {
   return this._parent.getTags("galleries", group);
}
