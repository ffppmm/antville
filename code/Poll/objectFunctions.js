/**
 * check if poll is ok. if true, save modified poll
 * @param Object the req.data object coming in from the action
 * @param Object the user as creator of the poll modifications
 * @return Object containing the properties
 *                - error (boolean): true if error occured, false otherwise
 *                - message (String): an error or a confirmation message
 *                - url (String): the URL string of the poll
 *                - id (Number): the internal Hop ID of the poll
 */

function evalPoll(param, creator) {
   var result;
   var choiceInput = param.choice;
   if (param.choice_array) {
      var choiceCnt = 0;
      for (var i in param.choice_array) {
         if (param.choice_array[i])
            choiceCnt++;
      }
   }
   if (param.question && choiceCnt > 1) {
      this.title = param.title;
      this.question = param.question;
      this.modifytime = new Date();
      for (var i=this.size(); i>0; i--) {
         var ch = this.get(i-1);
         this.remove(ch);
      }
      for (var i=0; i<param.choice_array.length; i++) {
         var title = param.choice_array[i];
         if (!title)
            continue;
         var newChoice = new choice();
         newChoice.poll = this;
         newChoice.title = title;
         newChoice.createtime = new Date();
         newChoice.modifytime = new Date();
         this.add(newChoice);
      }
      result = getConfirm("pollCreate");
   } else
      result = getError("pollMissingValues");
   return(result);
}


/**
 * check if a vote is ok. if true, save modified vote
 * @param Object the req.data object coming in from the action
 * @param Object the user as creator of the poll modifications
 * @return Object containing the properties
 *                - error (boolean): true if error occured, false otherwise
 *                - message (String): an error or a confirmation message
 *                - url (String): the URL string of the poll
 */

function evalVote(param, usr) {
	var result;
	if (param.choice) {
		var c = this.get(param.choice);
		var v = session.user ? this.votes.get(session.user.name) : null;
		if (v) {
			v.choice = c;
			v.modifytime = new Date();
		}
		else {
			var v = new vote();
			v.poll = this;
			v.choice = c;
			v.user = session.user;
			v.username = session.user.name;
			v.createtime = new Date();
			v.modifytime = new Date();
			this.votes.add(v);
		}
		result = getConfirm("vote");
	} else
		result = getConfirm("noVote");
	result.url = this.href();
	return(result);
}
