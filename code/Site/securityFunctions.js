/**
 * check if weblog is online
 * return false if not
 */

function isPublic() {
   if (!this.isOnline() && !this.isUserMember()) {
      res.message = "This weblog is not public!";
      return false;
   }
   return true;
}

/**
 * check if user is allowed to edit the preferences of this weblog
 */

function isEditAllowed() {
   if (!user.uid) {
      user.cache.referer = this.href("edit");
      return false;
   } else if (user.isBlocked()) {
      res.message = "Sorry, your account was disabled!";
      return false;
   } else if (!this.isUserAdmin()) {
      res.message ="You're not allowed to edit the preferences!";
      return false;
    }
    return true;
}

/**
 * check if user is allowed to add a story to this weblog
 */

function isAddAllowed() {
   if (!user.uid) {
      user.cache.referer = this.href("edit");
      return false;
   } else if (user.isBlocked()) {
      res.message = "Sorry, your account was disabled!";
      return false;
   } else if (!this.isUserAdmin() && !this.isUserContributor() && !this.userMayContrib()) {
      res.message ="You're not allowed to add a story to a foreign weblog!";
      return false;
    }
    return true;
}

/**
 * check if user is allowed to edit the preferences of this weblog
 */

function isEditMembersAllowed() {
   if (!user.uid) {
      user.cache.referer = this.href("memberships");
      return false;
   } else if (user.isBlocked()) {
      res.message = "Sorry, your account was disabled!";
      return false;
   } else if (!this.isUserAdmin()) {
      res.message ="You're not allowed to edit memberships!";
      return false;
    }
    return true;
}

/**
 * function checks if the user is admin of this weblog
 */

function isUserAdmin() {
   if (!this.isUserMember())
      return false;
   else if (!this.members.get(user.name).isAdmin())
      return false;
   return true;
}

/**
 * function checks if user is a member of this weblog
 */

function isUserContributor() {
   if (user.uid && this.userMayContrib())
      return true;
   else if (this.isUserMember() && this.members.get(user.name).isContributor())
      return true;
   return false;
}

/**
 * function checks if user is a member of this weblog
 */

function isUserMember() {
   if (!user.uid || !this.members.get(user.name))
      return false;
   return true;
}

/**
 * function checks if user is allowed to sign up
 */

function isSignUpAllowed() {
   if (this.isUserMember()) {
      res.message = "You are already a member of this weblog!";
      return false;
   } else if (!this.isOnline()) {
      res.message = "This weblog is not public!";
      return false;
   } else if (!this.userMaySignup()) {
      res.message = "Signing up was disabled!";
      return false;
   } else if (!user.uid) {
      user.cache.referer = this.href("signup");
      return false;
   } else if (user.isBlocked()) {
      res.message = "Sorry, your account was disabled!";
      return false;
   }
   return true;
}


/**
 * function checks if normal users are allowed to
 * contrib to this weblog
 */

function userMayContrib() {
   if (parseInt(this.usercontrib))
      return true;
   return false;
}


/**
 * function checks if archive of weblog is enabled
 */

function showArchive() {
   if (parseInt(this.archive))
      return true;
   return false;
}