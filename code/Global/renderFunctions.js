/**
 * open an html link element
 * @param String URL to use in a-tag
 */
function openLink(url) {
   var attr = new Object();
   attr.href = url;
   openMarkupElement("a", attr);
}

/**
 * close an html link element
 */
function closeLink() {
  closeMarkupElement("a");
}

/**
 * Opens an arbitrary x/html element ("begin tag")
 * @param name String containing the element's name
 * @param attr Object containing the element's attributes as properties
 */
function openMarkupElement(name, attr) {
  renderMarkupPart(name, attr);
  res.write(">");
}


/**
 * Closes an arbitray x/html element ("end tag")
 * @param name String containing the element's name
 */
function closeMarkupElement(name) {
  res.write("</" + name + ">");
}


/**
 * Outputs an arbitrary empty x/html element ("contentless tag")
 * @param name String containing the element's name
 * @param attr Object containing the element's attributes as properties
 */
function renderMarkupElement(name, attr) {
  renderMarkupPart(name, attr);
  res.write(" />");
}


/**
 * Outputs the first part of an arbitrary x/html element
 * except for the closing ">" or "/>" which is done by
 * openMarkupElement() or renderMarkupElement(), resp.
 * @param name String containing the element's name
 * @param attr Object containing the element's attributes as properties
 */
function renderMarkupPart(name, attr) {
  res.write("<" + name);
  if (attr) {
    // temporary mapping of class attribute
    // if attr.style contains class definition
    // (due to backwards-compatibility)
    if (attr.style && attr.style.indexOf(":") < 0) {
      attr["class"] = attr.style;
      delete attr.style;
    }
    delete attr.as;
    // creating the attribute string
    for (var i in attr) {
      if (attr[i] == null)
        continue;
      res.write(" " + i + "=\"" + attr[i] + "\"");
  	}
  }
}


/**
 * renders image element
 * @param img Object contains the images's properties
 * @param param Object contains user-defined properties
 */
function renderImage(img, param) {
   if (!param.title)
      param.title = img.alttext ? encode(img.alttext) : "";
   param.src = img.getStaticUrl();
   if (!param.width)
      param.width = img.width;
   if (!param.height)
      param.height = img.height;
   if (!param.border)
      param.border = "0";
   param.alt = encode(param.description ? param.description : img.alttext);
   renderMarkupElement("img", param);
}


/**
 * renders a textarea
 * @param param Object contains the element's attributes
 */
function renderInputTextarea(param) {
   if (param.width)
      param.cols = param.width;
   if (param.height)
      param.rows = param.height;
   if (!param.cols)
      param.cols = 40;
   if (!param.rows)
      param.rows = 5;
   if (!param.wrap)
      param.wrap = "virtual";
   var value = param.value ? encodeForm(param.value) : "";
   delete param.value;
   delete param.width;
   delete param.height;
   openMarkupElement("textarea", param);
   res.write(value);
   closeMarkupElement("textarea");
}


/**
 * renders a submit-button
 * @param param Object contains the element's attributes
 */
function renderInputButton(param) {
   param.type = "submit";
   if (param.content) {
      param.value = param.content;
      delete param.content;
   }
   if (!param.name)
      param.name = param.type;
   renderMarkupElement("input", param);  
}


/**
 * renders an input type text
 * @param param Object contains the element's attributes
 */
function renderInputText(param) {
   param.type = "text";
   // this one is left for backwards-compatibility
   if (param.width)
      param.size = param.width;
   if (!param.size)
      param.size = 20;
   delete param.width;
   param.value = param.value ? encodeForm(param.value) : "";
   renderMarkupElement("input", param);
}


/**
 * renders an input type password
 * @param param Object contains the element's attributes
 */
function renderInputPassword(param) {
  param.type = "password";
  param.size = param.width ? param.width : "20";
  delete param.width;
  renderMarkupElement("input", param);
}


/**
 * function renders an input type file
 * @param param Object contains the element's attributes
 */
function renderInputFile(param) {
  param.type = "file";
  renderMarkupElement("input", param);
} 


/**
 * renders an input type checkbox
 * @param param Object contains the element's attributes
 */
function renderInputCheckbox(param) {
  param.type = "checkbox";
  if (parseInt(param.value, 10) == 1 || param.value == true)
    param.checked = "checked";
  param.value = "1";
  renderMarkupElement("input", param);
}


/**
 * renders an input type checkbox
 * @param param Object contains the element's attributes
 */
function renderInputRadio(param) {
  param.type = "radio";
  if (param.value == param.selectedValue)
    param.checked = "checked";
  else
    delete param.checked;
  delete param.selectedValue;
  renderMarkupElement("input", param);
}


/**
 *  Renders a drop down box from an Array and an optional 
 *  current selection index. This is a simpler alternative 
 *  for the drop-down framework in hopobject. Its main 
 *  advantage is that Arrays are much simpler to set up in 
 *  JavaScript than (Hop)Objects:
 */
function renderDropDownBox(name, options, selectedIndex, firstoption) {
  var param = new Object();
  param.name = name;
  param.size = "1";
  openMarkupElement("select", param);
  if (firstoption) {
    param = new Object();
    param.value = "";
    openMarkupElement("option", param);
    res.write(firstoption);
    closeMarkupElement("option");
  }
  for (var i in options) {
    param = new Object();
    param.name = encode(options[i]);
    param.value = i; 
    if (param.value == selectedIndex)
      param.selected = "selected";
    openMarkupElement("option", param);
    res.write(param.name);
    closeMarkupElement("option");
  }
  closeMarkupElement("select");
}


/**
 * function tries to check if the color contains just hex-characters
 * if so, it returns the color-definition prefixed with a '#'
 * otherwise it assumes the color is a named one
 */
function renderColorAsString(c) {
   if (c && c.length == 6) {
      var nonhex = new RegExp("[^0-9,a-f]");
      nonhex.ignoreCase = true;
      var found = c.match(nonhex);
      if (!found) {
         while (c.length < 6)
            c="0"+c;
         // color-string contains just hex-characters, so we prefix it with '#'
         return("#" + c);
      }
   }
   return(c);
}

/**
 * renders a color as hex or named string
 */
function renderColor(c) {
  res.write(renderColorAsString(c));
}


/**
 * Do Wiki style substitution, transforming
 * stuff contained between asterisks into links.
 */
function doWikiStuff (src) {
  // robert, disabled: didn't get the reason for this:
  // var src= " "+src;
  if (src == null || src.indexOf ("<*") < 0)
     return src;

  // do the Wiki link thing, <*asterisk style*>
  var regex = new RegExp ("<[*]([^*]+)[*]>");
  regex.ignoreCase=true;

  var text = "";
  var start = 0;
  while (true) {
    var found = regex.exec (src.substring(start));
    var to = found == null ? src.length : start + found.index;
    text += src.substring(start, to);
    if (found == null)
      break;
    var name = ""+(new java.lang.String (found[1])).trim();
    var item = res.handlers.site.topics.get (name);
    if (item == null && name.lastIndexOf("s") == name.length-1)
      item = res.handlers.site.topics.get (name.substring(0, name.length-1));
    if (item == null || !item.size())
      text += format(name)+" <small>[<a href=\""+res.handlers.site.stories.href("create")+"?topic="+escape(name)+"\">define "+format(name)+"</a>]</small>";
    else
      text += "<a href=\""+item.href()+"\">"+name+"</a>";
    start += found.index + found[1].length+4;
  }
  return text;
}


/**
 * DEPRECATED!
 * use openMarkupElement(), closeMarkupElement() and 
 * renderMarkupElement() instead
 *
 * Returns an arbitrary x/html element as string
 * @param name String containing the element's name (tag)
 * @param content String containing the element's content
 * @param attr Object containing the element's attributes as properties
 */
function renderMarkupElementAsString(name, content, attr) {
   if (!content)
      content = "";
   // temporary mapping of class attribute
   // (due to backwards-compatibility)
   if (!attr["class"]) {
      attr["class"] = attr.style;
      delete attr.style;
   }
   var attributes = new java.lang.StringBuffer();
   for (var i in attr) {
      if (!attr[i])
         continue;
      attributes.append(" " + i + "=\"" + attr[i] + "\"");
   }
   return("<" + name + attributes.toString() + ">" + content + "</" + name + ">");
}


/**
 * function renders a dropdown-box containing all available
 * locales
 * @param Obj Locale-Object to preselect
 */

function renderLocaleChooser(loc) {
   var locs = java.util.Locale.getAvailableLocales();
   var options = new Array();
   // get the defined locale of this site for comparison
   for (var i in locs) {
      options[i] = locs[i].getDisplayName();
      if (loc && locs[i].equals(loc))
         var selectedIndex = i;
   }
   renderDropDownBox("locale",options,selectedIndex);
}
