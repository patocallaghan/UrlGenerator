(function( window, document, req_version, callback, $, script, done, readystate ){
  
  // If jQuery isn't loaded, or is a lower version than specified, load the
  // specified version and call the callback, otherwise just call the callback.
  if ( !($ = window.jQuery) || req_version > $.fn.jquery || callback( $ ) ) {
    
    // Create a script element.
    script = document.createElement( 'script' );
    script.type = 'text/javascript';
    
    // Load the specified jQuery from the Google AJAX API server (minified).
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' + req_version + '/jquery.min.js';
    
    // When the script is loaded, remove it, execute jQuery.noConflict( true )
    // on the newly-loaded jQuery (thus reverting any previous version to its
    // original state), and call the callback with the newly-loaded jQuery.
    script.onload = script.onreadystatechange = function() {
      if ( !done && ( !( readystate = this.readyState )
        || readystate == 'loaded' || readystate == 'complete' ) ) {
        
        callback( ($ = window.jQuery).noConflict(1), done = 1 );
        
        $( script ).remove();
      }
    };
    
    // Add the script element to either the head or body, it doesn't matter.
    document.documentElement.childNodes[0].appendChild( script );
  }
  
})( window, document,
  
  // Minimum jQuery version required. Change this as-needed.
  '1.7.2',
  
  // Your jQuery code goes inside this callback. $ refers to the jQuery object,
  // and L is a boolean that indicates whether or not an external jQuery file
  // was just "L"oaded.
  function( $, L ) {
    '$:nomunge, L:nomunge'; // Used by YUI compressor.
    
    //console.log('Terabytelet', window.Terabytelet);
	if(!window.Terabytelet){
		window.terabyteletLibrary = $;
		function loadFile(filename, filetype){
			var fileref;
			if (filetype === "js"){ //if filename is a external JavaScript file
			  fileref=document.createElement('script');
			  fileref.setAttribute("type","text/javascript");
			  fileref.setAttribute("src", filename);
			}
			else if (filetype === "css"){ //if filename is an external CSS file
			  fileref = document.createElement("link");
			  fileref.setAttribute("rel", "stylesheet");
			  fileref.setAttribute("type", "text/css");
			  fileref.setAttribute("href", filename);
			}

			if (typeof fileref!="undefined") {
			  document.getElementsByTagName("head")[0].appendChild(fileref);
			}
		}
		var filepath = "https://github.com/patocallaghan/UrlGenerator/blob/master/";
		loadFile(filepath + "css/style.css", "css");
		loadFile(filepath + "js/urlgenerator.min.js", "js");
	} else {
		window.Terabytelet.UrlGenerator.reInit();
	}
    
  }
);