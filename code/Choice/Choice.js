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
// $LastChangedBy$
// $LastChangedDate$
// $URL$

/**
 * @fileOverview Defines the Choice prototype.
 */

markgettext("Choice");
markgettext("choice");

/**
 * 
 */
Choice.add = function(title, poll) {
   HopObject.confirmConstructor(Choice);
   var choice = new Choice(title);
   choice.created = choice.modified = new Date;
   poll.add(choice);
   return choice;
}
 
/**
 * 
 */
Choice.remove = function() {
   if (this.constructor === Choice) {
      HopObject.remove.call(this);
      this.remove();
   }
   return;
}

/**
 * @name Choice
 * @constructor
 * @param {String} title
 * @property {Vote[]} _children
 * @property {Date} created
 * @property {Date} modified
 * @property {Poll} poll
 * @property {String} title
 * @extends HopObject
 */
Choice.prototype.constructor = function(title) {
   HopObject.confirmConstructor.call(this);
   this.title = title;
   return this;
}

/**
 * 
 */
Choice.prototype.selected_macro = function() {
   var votes;
   if (session.user && (votes = this._parent.votes.get(session.user.name))) {
      res.write(this === votes.choice);
   } else {
      res.write(false);
   }
   return;
}

/**
 * 
 * @param {Object} param
 * @param {String} variant
 */
Choice.prototype.votes_macro = function(param, variant) {
   var votes = 0;
   if (variant) {
      if (variant.endsWith("%")) {
         variant = parseInt(variant) || 1;
         var max = this._parent.votes.size();
         votes = this.size() / max * variant;
      } else {
         var max = 1;
         this._parent.forEach(function() {
            var n = this.size();
            if (n > max) {
               max = n;
            }
            return;
         });
         votes = Math.round(this.size() / max * variant);
      }
   } else {
      votes = this.size();
   }
   if (!votes && param["default"]) {
      return param["default"];
   }
   return votes;
}
