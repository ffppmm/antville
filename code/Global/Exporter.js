// The Antville Project
// http://code.google.com/p/antville
//
// Copyright 2007-2011 by Tobi Schäfer.
//
// Copyright 2001–2007 Robert Gaggl, Hannes Wallnöfer, Tobi Schäfer,
// Matthias & Michael Platzer, Christoph Lincke.
//
// Licensed under the Apache License, Version 2.0 (the ``License'');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an ``AS IS'' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// $Revision$
// $LastChangedBy$
// $LastChangedDate$
// $URL$

/**
 * @fileOverview
 */

var Exporter = {}

Exporter.run = function(site, user) {
   try {
      var file;
      if (site.export_id && (file = File.getById(site.export_id))) {
         File.remove.call(file);
      }
   
      var rssUrl = site.href("rss.xml");
      var baseDir = site.getStaticFile();
      var member = site.members.get(user.name);
   
      var xml = new helma.File(baseDir, "export.xml");
      xml.remove();
      xml.open();

      var add = function(s) {
         return xml.write(s);
      }

      add('<?xml version="1.0" encoding="UTF-8"?>');
      add('<?xml-stylesheet href="http://www.blogger.com/styles/atom.css" type="text/css"?>');
      add('<feed xmlns="http://www.w3.org/2005/Atom" xmlns:openSearch="http://a9.com/-/spec/opensearch/1.1/" xmlns:thr="http://purl.org/syndication/thread/1.0">');
      add('<id>tag:blogger.com,1999:blog-' + site._id + '.archive</id>');
      add('<updated>' + site.modified.format(Date.ISOFORMAT) + '</updated>');
      add('<title type="text">' + encodeXml(site.title) + '</title>');
      add('<link rel="http://schemas.google.com/g/2005#feed" type="application/rss+xml" href="' + rssUrl + '"/>');
      add('<link rel="self" type="application/rss+xml" href="' + rssUrl + '"/>');
      add('<link rel="http://schemas.google.com/g/2005#post" type="application/rss+xml" href="' + rssUrl + '"/>');
      add('<link rel="alternate" type="text/html" href="' + site.href() + '"/>');
      add('<author>');
      add('<name>' + site.creator.name + '</name>');
      add('<email>' + site.creator.email + '</email>');
      add('</author>');
      // Currently, blogger.com does not accept other generators
      //add('<generator version="' + Root.VERSION + '" uri="' + root.href() + '">Antville</generator>');
      add('<generator version="7.00" uri="http://www.blogger.com">Blogger</generator>');
      member.stories.forEach(function() {
         add('<entry>');
         add('<id>tag:blogger.com,1999:blog-' + site._id + '.post-' + this._id + '</id>');
         add('<published>' + this.created.format(Date.ISOFORMAT) + '</published>');
         add('<updated>' + this.modified.format(Date.ISOFORMAT) + '</updated>');
         add('<title type="text">' + (this.title ? encodeXml(this.title.stripTags()) : '') + '</title>');
         add('<content type="html">' + encodeXml(this.format_filter(this.text, {})) + '</content>');
         add('<link rel="alternate" type="text/html" href="' + this.href() + '"></link>');
         add('<category scheme="http://schemas.google.com/g/2005#kind" term="http://schemas.google.com/blogger/2008/kind#post"/>');
         add('<author>');
         add('<name>' + this.creator.name + '</name>');
         this.creator.url && add('<uri>' + this.creator.url + '</uri>');
         add('<email>' + this.creator.email + '</email>');
         add('</author>');
         add('</entry>');
      });
      add('</feed>');

      xml.close();
      // Provide the exported data as downloadable file
      // FIXME: Adding a file to a site could be a little bit simpler :/
      file = new File;
      file.site = site;
      file.update({file: {contentLength: 0}, file_origin: "file://" + 
            xml.getPath(), name: site.name + "-export"});
      site.files.add(file);
      file.creator = user;
      site.export_id = file._id;
   } catch (ex) {
      app.log(ex);
   } finally {
      xml.close();
      xml.remove();
   }

   // Reset the site’s export status
   site.job = null;
   return;
}
