/**
 * function checks if story fits to the minimal needs (must have at least a text ;-)
 * @param Obj story-object to work on
 * @param Obj Object containing the properties needed for creating a new story
 * @param Obj User-Object creating this story
 * @return Obj Object containing three properties:
 *             - error (boolean): true if error happened, false if everything went fine
 *             - message (String): containing a message to user
 *             - story (Obj): story-object containing assigned form-values
 *             - id (Int): id of created story
 */

function evalNewStory(s,param,creator) {
   var result = new Object();
   result.error = false;
   result.story = s;
   s.weblog = this._parent;
   s.title = param.title;
   s.text = param.text;
   s.prototype = "story";
   s.author = creator;
   // check if the create date is set in the param object
   if (param.createtime) {
      var ctime = tryEval ('parseTimestamp("'+param.createtime+'", "yyyy-MM-dd HH:mm")');
      if (ctime.error) {
          result.message = "Error: Can't parse timestamp \""+param.createtime+"\" as date";
          result.error = true;
      } else {
         s.createtime = ctime.value;
      }
      s.modifytime = new Date();
   } else {
      s.modifytime = s.createtime = new Date();
   }
   s.editableby = !isNaN(parseInt(param.editableby)) ? parseInt(param.editableby,10) : null;
   if (s.createtime)
      s.day = s.createtime.format("yyyyMMdd");
   s.ipaddress = param.http_remotehost;
   s.reads = 0;
   // start checking if story-params make sense
   if (!s.text) {
      result.message = "You need at least some text!";
      result.error = true;
   }

   var topic = param.topic ? param.topic : parseInt(param.topicidx,10);
   if (!isNaN(topic) && topic >= 0) {
      var topicNode = this._parent.topics.get(topic);
      s.topic = topicNode ? topicNode.groupname : null;
   } else
      s.topic = topic ? topic : null;

   // check if topic-name contains any forbidden characters
   if (!isCleanForURL(s.topic)) {
      result.message = "The name of the topic contains forbidden characters!";
      result.error = true;
   }
   var status = parseInt(param.online,10);
   if (isNaN(status)) {
      result.message = "Status of story is missing!";
      result.error = true;
   } else if (status == 1 && !s.topic) {
      result.message = "Can't set story online in topic because you didn't specify one!";
      result.error = true;
   } else
      s.online = status;

   // if everything ok, so proceed with adding the story
   if (!result.error) {
      if (this._parent.add(s)) {
         if (s.online) {
            s.weblog.lastupdate = s.createtime;
            result.url = s.href();
         } else
            result.url = this.href();
         result.message = "The story was created successfully!";
         result.id = s._id;
      } else {
         result.message = "Couldn't add the story!";
         result.error = true;
      }
   }
   return (result);
}


/**
 * delete a story
 * including all the comments
 * @param Obj Story-Object that should be deleted
 * @return Obj Object containing two properties:
 *             - error (boolean): true if error happened, false if everything went fine
 *             - message (String): containing a message to user
 */

function deleteStory(currStory) {
   var result = new Object();
   // delete all comments of story
   currStory.deleteAll();
   if (this.remove(currStory)) {
      this._parent.lastupdate = new Date();
      result.message = "The story was deleted successfully!";
      result.error = false;
   } else {
      result.message = "Ooops! Couldn't delete the story!";
      result.error = true;
   }
   return (result);
}

/**
 * function loops over all stories and removes them (including their comments!)
 * @return Boolean true in any case
 */

function deleteAll() {
   for (var i=this.size();i>0;i--)
      this.deleteStory(this.get(i-1));
   return (result);
}