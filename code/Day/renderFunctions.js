/**
 * function renders the list of stories for day-pages
 * and assigns the rendered list to res.data.storylist
 * scrollnavigation-links to previous and next page(s) are also
 * assigned to res.data (res.data.prevpage, res.data.nextpage)
 * prevpage- and nextpage-links always link to the previous
 * or next day
 */

function renderStorylist() {
   var dayIdx = this._parent.contains(this);
   if (dayIdx > 0) {
      var sp = new Object();
      sp.url = this._parent.get(dayIdx - 1).href();
      sp.text = "newer stories";
      res.data.prevpage = renderSkinAsString("prevpagelink", sp);
   }
   var storylist = new java.lang.StringBuffer();
   storylist.append(this.get(0).renderSkinAsString("dayheader"));
   for (var i=0;i<this.size();i++)
      storylist.append(this.get(i).renderSkinAsString("preview"));
   // assigning link to previous page to res.data.prevpage
   if (dayIdx < this._parent.size()-1) {
      var sp = new Object();
      sp.url = this._parent.get(dayIdx + 1).href();
      sp.text = "older stories";
      res.data.nextpage = renderSkinAsString("nextpagelink", sp);
   }
   res.data.storylist = storylist.toString();
   return;
}
