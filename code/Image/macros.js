/**
 * macro rendering alias of image
 */

function alias_macro(param) {
   res.write(param.prefix)
   if (param.as == "editor")
      this.renderInputText(this.createInputParam("alias",param));
   else
      res.write(this.alias);
   res.write(param.suffix);
}


/**
 * macro rendering alternate text of image
 */

function alttext_macro(param) {
   res.write(param.prefix)
   if (param.as == "editor")
      this.renderInputText(this.createInputParam("alttext",param));
   else
      res.write(this.alttext);
   res.write(param.suffix);
}

/**
 * macro renders a link for editing image
 */

function editlink_macro(param) {
   if (this.creator == user) {
      res.write(param.prefix);
      var linkParam = new HopObject();
      linkParam.linkto = "edit";
      this.openLink(linkParam);
      if (param.image && this.weblog.images.get(param.image))
         this.weblog.renderImage(this.weblog.images.get(param.image),param);
      else
         res.write(param.text ? param.text : "edit");
      this.closeLink();
      res.write(param.suffix);
   }
}

/**
 * macro rendering a link to delete
 * if user is author of this story
 */

function deletelink_macro(param) {
   if (this.creator == user || this.weblog.isUserAdmin()) {
      res.write(param.prefix);
      var linkParam = new HopObject();
      linkParam.linkto = "delete";
      this.openLink(linkParam);
      if (param.image && this.weblog.images.get(param.image))
         this.weblog.renderImage(this.weblog.images.get(param.image),param);
      else
         res.write(param.text ? param.text : "delete");
      this.closeLink();
      res.write(param.suffix);
   }
}

/**
 * macro renders the image-tag
 */

function show_macro(param) {
   res.write(param.prefix)
   if (param.what == "thumbnail" && this.thumbnail)
      var img = this.thumbnail;
   else
      var img = this;
   if (this.creator == user) {
      var linkParam = new HopObject();
      linkParam.linkto = "edit";
      this.openLink(linkParam);
      path.weblog.renderImage(img,param);
      this.closeLink();
   } else
      path.weblog.renderImage(img,param);
   res.write(param.suffix);
}

/**
 * macro renders the name of the creator of this image
 */

function creator_macro(param) {
   res.write(param.prefix);
   res.write(this.creator.name);
   res.write(param.suffix);
}

/**
 * macro rendering createtime of image
 */

function createtime_macro(param) {
   if (!this.createtime)
      return;
   res.write(param.prefix);
   res.write(this.weblog.formatTimestamp(this.createtime,param));
   res.write(param.suffix);
}

/**
 * macro renders "yes" if this image has a thumbnail
 */

function hasthumbnail_macro(param) {
   res.write(param.prefix);
   if (this.thumbnail)
      res.write("yes");
   else
      res.write("no");
   res.write(param.suffix);
}