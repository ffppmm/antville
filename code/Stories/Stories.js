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
 * @fileOverview Defines the Stories prototype
 */

markgettext("Stories");
markgettext("stories");

/**
 * @name Stories
 * @constructor
 * @property {Story[]} _children
 * @property {Tag[]} alphabeticalTags
 * @property {Story[]} closed
 * @property {Comment[]} comments
 * @property {Story[]} featured
 * @property {Tag[]} otherTags
 * @property {Story[]} recent
 * @property {Tag[]} tags
 * @property {Story[]} top
 * @property {Story[]} union
 * @extends HopObject
 */

/**
 * 
 * @param {String} action
 * @returns {Boolean}
 */
Stories.prototype.getPermission = function(action) {
   if (!this._parent.getPermission("main")) {
      return false;
   }
   switch (action) {
      case ".":
      case "main":
      case "create":
      return Site.require(Site.OPEN) && session.user ||
            Membership.require(Membership.CONTRIBUTOR) || 
            User.require(User.PRIVILEGED); 

      case "all":
      case "top":
      case "closed":
      return Membership.require(Membership.MANAGER) ||
            User.require(User.PRIVILEGED);
   }
   return false;
}

Stories.prototype.main_action = function() {
   var stories = User.getMembership().stories;
   res.data.list = renderList(stories, "$Story#listItem", 
         10, req.queryParams.page);
   res.data.pager = renderPager(stories, 
         this.href(), 10, req.queryParams.page);
   res.data.title = gettext("Member Stories");
   res.data.body = this.renderSkinAsString("$Stories#main");
   this._parent.renderSkin("Site#page");
   return;
}

Stories.prototype.create_action = function() {
   if (req.data.save) {
      try {
         story = Story.add(req.params);
         story.notify(req.action);
         JSON.sendPaddedResponse(story._id);
         delete session.data.backup;
         res.message = gettext("The story was successfully created.");
         res.redirect(story.href());
      } catch (ex) {
         JSON.sendPaddedResponse(null);
         res.status = 400;
         res.message = ex;
         app.log(ex);
      }
   }
   
   res.data.title = gettext("Add Story");
   res.data.action = this.href(req.action);
   HopObject.confirmConstructor(Story);
   res.data.body = (new Story).renderSkinAsString("Story#edit");
   this._parent.renderSkin("Site#page");
   return;
}

Stories.prototype.closed_action = function() {
   res.data.list = renderList(this.closed, 
         "$Story#listItem", 10, req.queryParams.page);
   res.data.pager = renderPager(this.closed, 
         this.href(req.action), 10, req.queryParams.page);
   res.data.title = gettext("Closed Stories");
   res.data.body = this.renderSkinAsString("$Stories#main");
   this._parent.renderSkin("Site#page");
   return;
}

Stories.prototype.all_action = function() {
   res.data.list = renderList(this, "$Story#listItem", 10, req.queryParams.page);
   res.data.pager = renderPager(this, 
         this.href(req.action), 10, req.queryParams.page);
   res.data.title = gettext("All Stories");
   res.data.body = this.renderSkinAsString("$Stories#main");
   this._parent.renderSkin("Site#page");
   return;
}

Stories.prototype.top_action = function() {
   res.data.title = gettext("Top Stories");
   res.data.body = this.renderSkinAsString("$Stories#top");
   this._parent.renderSkin("Site#page");
   return;
}

/**
 * 
 * @param {Object} param
 * @param {String} type
 */
Stories.prototype.list_macro = function(param, type) {
   switch (type) {
      case "top":
      var counter = 1;
      this.top.forEach(function() {
         this.renderSkin("$Story#top", {
            position: counter
         });
         counter += 1;
      }); 
      break;
   }
   return;
}

/**
 * 
 * @param {String} group
 * @returns {Tag[]}
 * @see Site#getTags
 */
Stories.prototype.getTags = function(group) {
   return this._parent.getTags("tags", group);
}

/**
 * 
 * @param {String} name
 * @returns {String[]}
 */
Stories.prototype.getAdminHeader = function(name) {
   return ["#", "Tag", "Items"];
}
