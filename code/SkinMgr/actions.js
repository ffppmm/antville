/**
 * main action
 */

function main_action() {
   res.data.title = "Skins of " + res.handlers.context.title;
   res.data.body = this.renderSkinAsString("main");
   this._parent.renderSkin("page");
}

/**
 * creates a new skinset
 */
function create_action() {
   if (req.data.action) {
      if (!req.data.name) {
         res.message = "Skinset name is missing!"
      } else {
         var s = new skinset();
         s.psite = path.site;
         s.name = req.data.name;
         s.creator = session.user;
         s.createtime = new Date();
         if (req.data.skinset) 
            s.parent = this.get(req.data.skinset);
         this.add(s);
         res.message = "Skinset "+s.name+" created!";
         res.redirect(s.href());
      }
   }

   var s = new skinset();
   res.data.title = "Create new skinset for " + this._parent.title;
   res.data.body = this.renderSkinAsString("create");
   this._parent.renderSkin("page");
}

/**
 * action rendering the differences between the original skin
 * and the modified one
 */
function diff_action() {
   if (!req.data.proto || !req.data.name ||
       !this[req.data.proto] || !this[req.data.proto][req.data.name] ||
       !app.skinfiles[req.data.proto])
   {
      res.message = new Exception("skinDiff");
      res.redirect(this.href());
   }
   
   // get the modified and original skins
   var modifiedSkin = this[req.data.proto][req.data.name].skin;
   var originalSkin = app.skinfiles[req.data.proto][req.data.name];

   var buf = new java.lang.StringBuffer();
   if (originalSkin == null || modifiedSkin == null) {
      buf.append("Invalid Parameters. No Diff.");
   } else {
      buf.append("<h3>Diffs for "+req.data.proto+"/"+req.data.name+"</h3>");
      var diff = originalSkin.diff(modifiedSkin);
      if (!diff) {
         buf.append("No differences were found");
      } else {
         // print a short explanation of the output format
         buf.append("<span style=\"background: #FF3333\">&nbsp;&nbsp;&nbsp;&nbsp;</span> ");
         buf.append(" Lines removed from original skin<br />");
         buf.append("<span style=\"background: #33CC33\">&nbsp;&nbsp;&nbsp;&nbsp;</span> ");
         buf.append(" Lines added to modified skin<br />");
         
         buf.append("<pre>");
         for (var i in diff) {
            var line = diff[i];
            if (line.deleted) {
               for (var j=0;j<line.deleted.length;j++)
                  buf.append((line.num + j) + " DEL <span style=\"background: #FF3333\">" + encode(line.deleted[j]) + "</span>\r\n");
            }
            if (line.inserted) {
               for (var j=0;j<line.inserted.length;j++)
                  buf.append((line.num + j) + " INS <span style=\"background: #33CC33\">" + encode(line.inserted[j]) + "</span>\r\n");
            }
            if (line.value) {
               buf.append(line.num + "     <span>" + encode(line.value) + "</span>\r\n");
            }
         }
         buf.append("</pre>");
      }
   }
   res.data.title = "Diffs for " + req.data.proto + "/" + req.data.name + ".skin of " + this._parent.title;
   res.data.body = buf.toString();
   this.renderSkin("page");
}

/**
 * action renders the skinmgr menu in a safe (eg. unscrewable) way using
 * the page skin of skinmgr instead of the one of the site
 * so if something goes wrong this action should at least
 * give users the possibility to undo their changes
 */
function safe_action() {
   res.data.title = this._parent.title;
   res.data.body = this.renderSkinAsString("main");
   this.renderSkin("page");
}

/**
 *  action evaluates the result of the default skinset form submission.
 */
function edit_action() {
   this.setDefaultSkinset(req.data.defaultSkinset);
   // loop through skinsets and set shared flag
   for (var i in this.list()) {
      var set = this[i];
      if (req.data[set._id] == "1") {
         if (set.shared != 1) set.shared = 1;
      } else {
         if (set.shared != 0) set.shared = 0;
      }
   }
   res.message = "Default skinset was set to "+req.data.defaultSkinset;
   res.redirect(this.href());
}
