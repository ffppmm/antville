
/**
 * returns name of action file the user has called
 * Input params: none
 * returns: string (= name of .hac-file)
 */


function getActionName() {
   // return name of current action executed by user
   var rPath = req.path.split("/");
   if (path[path.length-1]._id == rPath[rPath.length-1] || path[path.length-1]._name == rPath[rPath.length-1])
      return "main";
   else
      return(rPath[rPath.length -1]);
}

/**
 * function tries to check if the color contains just hex-characters
 * if so, it renders the color-definition prefixed with a '#'
 * otherwise it assumes the color is a named one
 */

function renderColor(c) {
   if (c.length == 6) {
      var nonhex = new RegExp("[^0-9,a-f]");
      nonhex.ignoreCase = true;
      var found = c.match(nonhex);
      if (!found) {
         // color-string contains just hex-characters, so we prefix it with '#'
         res.write("#" + c);
         return;
      }
   }
   res.write(c);
}

/**
 * function renders only a part of the text passed as argument
 * length of the string to show is defined by argument "limit"
 */

function renderTextPreview(text,limit) {
   var text = stripTags(text);
   var limit = Math.min(limit,text.length);
   var charCnt = 0;
   for (var i=0;i<text.length;i++) {
      charCnt = (text.charAt(i) == " " ? 0 : charCnt+1);
      if (charCnt > 20) {
         res.write("<wbr>");
         charCnt = 0;
      }
      if (i >= limit && text.charAt(i) == " ")
         break;
      res.write(text.charAt(i));
   }
}