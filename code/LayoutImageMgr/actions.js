/**
 * display all images of a site or layout
 */
function main_action() {
   var sorter = function(a, b) {
      return b.createtime - a.createtime;
   }
   var allimages = this.list();
   if (this._parent.parent) {
      allimages = allimages.concat(this._parent.parent.images.list());
      allimages.sort(sorter);
   }
   res.data.imagelist = renderList(allimages, "mgrlistitem", 10, req.data.page);
   res.data.pagenavigation = renderPageNavigation(this, this.href(), 10, req.data.page);
   res.data.title = "Images of " + this._parent.title;
   res.data.body = this.renderSkinAsString("main");
   res.handlers.context.renderSkin("page");
}

/**
 * display the images of the parent layout
 */
function default_action() {
   if (!this._parent.parent) {
      res.message = new Exception("layoutNoParent");
      res.redirect(this.href());
   }
   res.data.imagelist = renderList(this._parent.parent.images, "mgrlistitem", 10, req.data.page);
   res.data.pagenavigation = renderPageNavigation(this._parent.parent.images, this.href(req.action), 10, req.data.page);
   res.data.title = "Images of layout '" + this._parent.parent.title + "'";
   res.data.body = this.renderSkinAsString("main");
   res.handlers.context.renderSkin("page");
}

/**
 * display the images of this layout
 */
function additional_action() {
   res.data.imagelist = renderList(this, "mgrlistitem", 10, req.data.page);
   res.data.pagenavigation = renderPageNavigation(this, this.href(req.action), 10, req.data.page);
   res.data.title = "Images of layout '" + this._parent.title + "'";
   res.data.body = this.renderSkinAsString("main");
   res.handlers.context.renderSkin("page");
}
