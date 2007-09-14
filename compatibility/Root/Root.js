Root.prototype.url_macro = function(param) {
   return this.href_macro(param);
};

Root.prototype.loginstatus_macro = function(param) {
   if (session.user)
      this.members.renderSkin("statusloggedin");
   else if (req.action != "login")
      this.members.renderSkin("statusloggedout");
   return;
};

Root.prototype.layoutchooser_macro = function(param) {
   if (root.sys_layout)
      param.selected = root.sys_layout.alias;
   root.layouts.layoutchooser_macro(param);
   return;
};

Root.prototype.localechooser_macro = function(param) {
   if (!session.user.sysadmin)
      return;
   renderLocaleChooser(this.getLocale());
   return;
};

Root.prototype.timezonechooser_macro = function(param) {
   if (!session.user.sysadmin)
      return;
   renderTimeZoneChooser(this.getTimeZone());
   return;
};

Root.prototype.longdateformat_macro = function(param) {
   if (!session.user.sysadmin)
      return;
   renderDateformatChooser("longdateformat", root.getLocale(), this.longdateformat);
   return;
};

Root.prototype.shortdateformat_macro = function(param) {
   if (!session.user.sysadmin)
      return;
   renderDateformatChooser("shortdateformat", root.getLocale(), this.shortdateformat);
   return;
};

Root.prototype.sysmgrnavigation_macro = function(param) {
   if (session.user && session.user.sysadmin)
      this.renderSkin("sysmgrnavigation");
   return;
};

Root.prototype.sys_title_macro = function(param) {
   if (param.as == "editor")
      Html.input(this.createInputParam("sys_title", param));
   else
      res.write(this.getTitle());
   return;
};

Root.prototype.sys_url_macro = function(param) {
   if (param.as == "editor")
      Html.input(this.createInputParam("sys_url", param));
   else
      res.write(this.sys_url);
   return;
};

Root.prototype.sys_email_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      param["type"] = "text";
      var iParam = this.createInputParam("sys_email", param);
      // use the users email if sys_email is empty
      if (!iParam.value)
         iParam.value = session.user.email;
      Html.input(iParam);
   } else
      res.write(this.sys_email);
   return;
};

Root.prototype.sys_allowFiles_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      var inputParam = this.createCheckBoxParam("sys_allowFiles", param);
      if (req.data.save && !req.data.sys_allowFiles)
         delete inputParam.checked;
      Html.checkBox(inputParam);
   } else
      res.write(this.sys_allowFiles ? getMessage("generic.yes") : getMessage("generic.no"));
   return;
};

Root.prototype.sys_diskQuota_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      param["type"] = "text";
      var iParam = this.createInputParam("sys_diskQuota", param);
      Html.input(iParam);
   } else
      res.write(this.sys_diskquota);
   return;
};

Root.prototype.sys_limitNewSites_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      var options = [getMessage("SysMgr.registeredUsers"), getMessage("SysMgr.trustedUsers"), "---------"];
      Html.dropDown({name: "sys_limitNewSites"}, options, this.sys_limitNewSites);
   } else
      res.write(this.sys_limitNewSites);
   return;
};

Root.prototype.sys_minMemberAge_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      var options = new Array();
      for (var i=1;i<92;i++) {
         if (i < 7 || (i % 7) == 0)
            options[options.length] = i.toString();
      }
      Html.dropDown({name: "sys_minMemberAge"}, options, this.sys_minMemberAge, "----");
   } else
      res.write(this.sys_minMemberAge);
   return;
};

Root.prototype.sys_minMemberSince_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      if (this.sys_minMemberSince)
         param.value = formatTimestamp(this.sys_minMemberSince, "yyyy-MM-dd HH:mm");
      param.name = "sys_minMemberSince";
      Html.input(param);
   } else
      res.write(this.sys_minMemberSince);
   return;
};

Root.prototype.sys_waitAfterNewSite_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      var options = new Array();
      for (var i=1;i<92;i++) {
         if (i < 7 || !(i%7))
            options[i] = i;
      }
      Html.dropDown({name: "sys_waitAfterNewSite"}, options, this.sys_waitAfterNewSite, "----");
   } else
      res.write(this.sys_waitAfterNewSite);
   return;
};

Root.prototype.sys_enableAutoCleanup_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      var inputParam = this.createCheckBoxParam("sys_enableAutoCleanup", param);
      if (req.data.save && !req.data.sys_enableAutoCleanup)
         delete inputParam.checked;
      Html.checkBox(inputParam);
   } else
      res.write(this.sys_enableAutoCleanup ? getMessage("generic.yes") : getMessage("generic.no"));
   return;
};

Root.prototype.sys_startAtHour_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      var options = new Array();
      for (var i=0;i<24;i++)
         options[i] = (i < 10 ? "0" + i : i.toString());
      Html.dropDown({name: "sys_startAtHour"}, options, this.sys_startAtHour);
   } else
      res.write(this.sys_startAtHour);
   return;
};

Root.prototype.sys_blockPrivateSites_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      var inputParam = this.createCheckBoxParam("sys_blockPrivateSites", param);
      if (req.data.save && !req.data.sys_blockPrivateSites)
         delete inputParam.checked;
      Html.checkBox(inputParam);
   } else
      res.write(this.sys_blockPrivateSites ? getMessage("generic.yes") : getMessage("generic.no"));
   return;
};

Root.prototype.sys_blockWarningAfter_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor")
      Html.input(this.createInputParam("sys_blockWarningAfter", param));
   else
      res.write(this.sys_blockWarningAfter);
   return;
};

Root.prototype.sys_blockAfterWarning_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor")
      Html.input(this.createInputParam("sys_blockAfterWarning", param));
   else
      res.write(this.sys_blockAfterWarning);
   return;
};

Root.prototype.sys_deleteInactiveSites_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      var inputParam = this.createCheckBoxParam("sys_deleteInactiveSites", param);
      if (req.data.save && !req.data.sys_deleteInactiveSites)
         delete inputParam.checked;
      Html.checkBox(inputParam);
   } else
      res.write(this.sys_deleteInactiveSites ? getMessage("generic.yes") : getMessage("generic.no"));
   return;
};

Root.prototype.sys_deleteWarningAfter_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor")
      Html.input(this.createInputParam("sys_deleteWarningAfter", param));
   else
      res.write(this.sys_deleteWarningAfter);
   return;
};

Root.prototype.sys_deleteAfterWarning_macro = function(param) {
   // this macro is allowed just for sysadmins
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor")
      Html.input(this.createInputParam("sys_deleteAfterWarning", param));
   else
      res.write(this.sys_deleteAfterWarning);
   return;
};

Root.prototype.sys_frontSite_macro = function(param) {
   if (!session.user.sysadmin)
      return;
   if (param.as == "editor") {
      var inputParam = new Object();
      inputParam.name = "sys_frontSite";
      inputParam.value = root.sys_frontSite ? root.sys_frontSite.alias : null;
      Html.input(inputParam);
   } else
      res.write (root.sys_frontSite);
   return;
};

Root.prototype.sys_allowEmails_macro = function(param) {
  // this macro is allowed just for sysadmins
  if (!session.user.sysadmin)
     return;
  if (param.as == "editor") {
     var options = new Array(getMessage("SysMgr.allowNotfication.no"), 
                             getMessage("SysMgr.allowNotfication.all"), 
                             getMessage("SysMgr.allowNotfication.trusted"));
     Html.dropDown({name: "sys_allowEmails"}, options, this.sys_allowEmails);
  } else
     res.write(this.sys_allowEmails);
  return;
};

