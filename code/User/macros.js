/**
 * macro rendering username
 */

function name_macro(param) {
   if (this.url)
      Html.link({href: this.url}, this.name);
   else
      res.write(this.name);
}

/**
 * macro rendering password
 */

function password_macro(param) {
   if (param.as == "editor")
      Html.password(this.createInputParam("password", param));
   return;
}


/**
 * macro rendering URL
 */

function url_macro(param) {
   if (param.as == "editor")
      Html.input(this.createInputParam("url", param));
   else
      res.write(this.url);
}


/**
 * macro rendering email
 */

function email_macro(param) {
   if (param.as == "editor")
      Html.input(this.createInputParam("email", param));
   else
      res.write(this.email);
}

/**
 * macro rendering checkbox for publishemail
 */

function publishemail_macro(param) {
   if (param.as == "editor") {
      var inputParam = this.createCheckBoxParam("publishemail", param);
      if (req.data.save && !req.data.publishemail)
         delete inputParam.checked;
      Html.checkBox(inputParam);
   } else
      res.write(this.publishemail ? "yes" : "no");
}


/**
 * macro renders the sites the user is a member of or has subscribed to
 * in order of their last update-timestamp
 */
function sitelist_macro(param) {
   var memberships = session.user.list();
   memberships.sort(new Function("a", "b", "return b.site.lastupdate - a.site.lastupdate"));
   for (var i in memberships) {
      var site = memberships[i].site;
      if (!site)
         continue;
      site.renderSkin("preview");
   }
   return;
}