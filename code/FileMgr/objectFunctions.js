/**
 * function checks if file fits to the minimal needs
 * @param Obj Object containing the properties needed for creating a new File
 * @param Obj User-Object creating this file
 * @return Obj Object containing two properties:
 *             - error (boolean): true if error happened, false if everything went fine
 *             - message (String): containing a message to user
 */
function evalFile(param, creator) {
   if (param.uploadError) {
      // looks like the file uploaded has exceeded uploadLimit ...
      throw new Exception("fileFileTooBig");
   }
   if (!param.rawfile || param.rawfile.contentLength == 0) {
      // looks like nothing was uploaded ...
      throw new Exception("fileNoUpload");
   }
   var filesize = Math.round(param.rawfile.contentLength / 1024);
   if (this._parent.getDiskUsage() + filesize > this._parent.getDiskQuota()) {
      // disk quota has already been exceeded
      throw new Exception("siteQuotaExceeded");
   }
   var newFile = new File(creator);
   // if no alias given try to determine it
   if (!param.alias)
      newFile.alias = buildAliasFromFile(param.rawfile, this);
   else {
      if (!param.alias.isFileName())
         throw new Exception("noSpecialChars");
      newFile.alias = buildAlias(param.alias, this);
   }
   // store properties necessary for file-creation
   newFile.alttext = param.alttext;
   newFile.name = newFile.alias;
   newFile.filesize = param.rawfile.contentLength;
   newFile.mimetype = param.rawfile.contentType;
   newFile.description = param.description;
   var dir = this._parent.getStaticPath("files");
   newFile.name = param.rawfile.writeToFile(dir, newFile.name);
   if (!newFile.name)
      throw new Exception("fileSave");
   // the file is on disk, so we add the file-object
   if (!this.add(newFile))
      throw new Exception("fileCreate", newFile.alias);
   // send e-mail notification
   if (newFile.site.isNotificationEnabled())
      newFile.site.sendNotification("upload", newFile);
   newFile.site.diskusage += newFile.filesize;
   return new Message("fileCreate", newFile.alias, newFile);
}


/**
 * delete a file
 * @param Obj file-object to delete
 * @return String Message indicating success or failure
 */

function deleteFile(fileObj) {
   // first remove the file from disk
   var f = new Helma.File(this._parent.getStaticPath("files"), fileObj.name);
   f.remove();
   fileObj.site.diskusage -= fileObj.filesize;
   fileObj.remove();
   return new Message("fileDelete");
}

/**
 * function deletes all files
 */

function deleteAll() {
   for (var i=this.size();i>0;i--)
      this.deleteFile(this.get(i-1));
   return true;
}
