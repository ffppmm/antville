Helma = {
   toString: function() {
      return "[Helma JavaScript Extensions]";
   }
}


Helma.Image = function(arg) {
   var generator = new Packages.helma.image.ImageGenerator();
   return generator.createImage(arg);
}


Helma.File = function(path) {
   var BufferedReader         = java.io.BufferedReader;
   var File                   = java.io.File;
   var Reader                 = java.io.Reader;
   var Writer                 = java.io.Writer;
   var FileReader             = java.io.FileReader;
   var FileWriter             = java.io.FileWriter;
   var PrintWriter            = java.io.PrintWriter;
   var EOFException           = java.io.EOFException;
   var IOException            = java.io.IOException;
   var IllegalStateException  = java.lang.IllegalStateException

   var self = this;

   var file;
   try {
      if (arguments.length > 1)
         file = new File(path, arguments[1]);
      else
         file = new File(path);
   } catch (e) {
      throw(e);
   }

   var readerWriter;
   var atEOF = false;
   var lastLine = null;

   var setError = function(e) {
      this.lastError = e;
   };

   this.lastError = null;

   this.toString = function() {
      return file.toString();
   };

   this.getName = function() {
      var name = file.getName();
      return (name == null ? "" : name);
   };

   this.isOpened = function() {
      return (readerWriter != null);
   };

   this.open = function() {
      if (self.isOpened()) {
         setError(new IllegalStateException("File already open"));
         return false;
      }
      // We assume that the BufferedReader and PrintWriter creation
      // cannot fail except if the FileReader/FileWriter fails.
      // Otherwise we have an open file until the reader/writer
      // get garbage collected.
      try{
         if (file.exists()) {
            readerWriter = new BufferedReader(new FileReader(file));
         } else {
            readerWriter = new PrintWriter(new FileWriter(file));
         }
         return true;
      } catch (e) {
         setError(e);
         return false;
      }
      return;
   };

   this.exists = function() {
      return file.exists();
   };

   this.getParent = function() {
      return new Helma.File(file.getParent());
   };

   this.readln = function() {
      if (!self.isOpened()) {
         setError(new IllegalStateException("File not opened"));
         return null;
      }
      if (!(readerWriter instanceof BufferedReader)) {
         setError(new IllegalStateException("File not opened for reading"));
         return null;
      }
      if (atEOF) {
         setError(new EOFException());
         return null;
      }
      if (lastLine != null) {
         var line = lastLine;
         lastLine = null;
         return line;
      }
      var reader = readerWriter;
      // Here lastLine is null, return a new line
      try {
         var line = readerWriter.readLine();
         if (line == null) {
            atEOF = true;
            setError(new EOFException());
         }
         return line;
      } catch (e) {
         setError(e);
         return null;
      }
      return;
   };

   this.write = function(what) {
      if (!self.isOpened()) {
         setError(new IllegalStateException("File not opened"));
         return false;
      }
      if (!(readerWriter instanceof PrintWriter)) {
         setError(new IllegalStateException("File not opened for writing"));
         return false;
      }
      if (what != null) {
         readerWriter.print(what.toString());
      }
      return true;
   };

   this.writeln = function(what) {
      if (self.write(what)) {
         readerWriter.println();
         return true;
      }
      return false;
   };

   this.isAbsolute = function() {
      return file.isAbsolute();
   };

   this.remove = function() {
      if (self.isOpened()) {
         setError(new IllegalStateException("An openened file cannot be removed"));
         return false;
      }
      return file["delete"]();
   };

   this.list = function() {
      if (self.isOpened())
         return null;
      if (!file.isDirectory())
         return null;
      return file.list();   
   };

   this.flush = function() {
      if (!self.isOpened()) {
         setError(new IllegalStateException("File not opened"));
         return false;
      }
      if (readerWriter instanceof Writer) {
         try {
            readerWriter.flush();
         } catch (e) {
           setError(e);
           return false;
         }
      } else {
         setError(new IllegalStateException("File not opened for write"));
         return false; // not supported by reader
      }
      return true;
   };

   this.close = function() {
      if (!self.isOpened())
         return false;
      try {
         readerWriter.close();
         readerWriter = null;
         return true;
      } catch (e) {
         setError(e);
         readerWriter = null;
         return false;
      }
   };

   this.getPath = function() {
      var path = file.getPath();
      return (path == null ? "" : path);
   };

   this.error = function() {
      if (lastError == null) {
         return "";
      } else {
         var exceptionName = lastError.getClass().getName();
         var l = exceptionName.lastIndexOf(".");
         if (l > 0)
            exceptionName = exceptionName.substring(l + 1);
         return exceptionName + ": " + lastError.getMessage();
      }
   };

   this.clearError = function() {
      lastError = null;
      return;
   };

   this.canRead = function() {
      return file.canRead();
   };

   this.canWrite = function() {
      return file.canWrite();
   };

   this.getAbsolutePath = function() {
      var absolutPath = file.getAbsolutePath();
      return (absolutPath == null ? "" : absolutPath);
   };

   this.getLength = function() {
      return file.length();
   };

   this.isDirectory = function() {
      return file.isDirectory();
   };

   this.isFile = function() {
      return file.isFile();
   };

   this.lastModified = function() {
      return file.lastModified();
   };

   this.mkdir = function() {
      if (self.isOpened())
         return false;
      return file.mkdirs();   // Using multi directory version
   };

   this.renameTo = function(toFile) {
      if (toFile.file == null) {
         setError(new IllegalArgumentException("Uninitialized target File object"));
         return false;
      }
      if (self.isOpened()) {
         setError(new IllegalStateException("An openened file cannot be renamed"));
         return false;
      }
      if (toFile.readerWriter != null) {
         setError(new IllegalStateException("You cannot rename to an openened file"));
         return false;
      }
      return file.renameTo(toFile.file);
   };

   this.eof = function() {
      if (!self.isOpened()) {
         setError(new IllegalStateException("File not opened"));
         return true;
      }
      if (!(readerWriter instanceof BufferedReader)) {
         setError(new IllegalStateException("File not opened for read"));
         return true;
      }
      if (atEOF)
         return true;
      if (lastLine != null)
         return false;
      try {
         lastLine = readerWriter.readLine();
         if (lastLine == null)
            atEOF = true;
         return atEOF;
      } catch (e) {
         setError(e);
         return true;
      }
   };

   this.readAll = function() {
      // Open the file for readAll
      if (self.isOpened()) {
         setError(new IllegalStateException("File already open"));
         return null;
      }
      try { 
         if (file.exists()) {
            readerWriter = new BufferedReader(new FileReader(file));
         } else {
            setError(new IllegalStateException("File does not exist"));
            return null;
         }
         if (!file.isFile()) {
            setError(new IllegalStateException("File is not a regular file"));
            return null;
         }
      
         // read content line by line to setup properl eol
         var buffer = new java.lang.StringBuffer(file.length() * 1.10);
         while (true) {
            var line = readerWriter.readLine();
            if (line == null)
               break;
            buffer.append(line);
            buffer.append("\n");  // EcmaScript EOL
         }
     
         // Close the file
         readerWriter.close();
         readerWriter = null;
         return buffer.toString();
      } catch (e) {
         readerWriter = null;
         setError(e);
         return null;
      }
   };
   return this;
}
