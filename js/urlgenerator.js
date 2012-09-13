(function( global, $ ) {
   		var Terabytelet = {};
	  	Terabytelet.UrlGenerator = (function() {

	  	var _$container,
	  		_$inputs;

	  	var _HTML = '<div id="terabyte-url">' +
						'<fieldset>' +
							'<legend>Terabyte Server URL Generator</legend>' +
							'<label for="dev">Dev URL</label>' +
							'<input type="text" placeholder="Dev" name="dev" />' +
							'<label for="test">Test URL</label>' +
							'<input type="text" placeholder="Test" name="test" />' +
							'<div class="buttons">' +
								'<a class="btn" id="home">Home</a>' +
								'<a class="btn" id="admin">Admin</a>' +
								'<a class="btn btn-wide" id="both">Both</a>' +
							'</div>' +
							'<a class="close">X</a>' +
						'</fieldset>' +
					'</div>',​
	  		_URL = {
	            "_URL_START" : "http://www.",
	            "_URL_END" : ".terabyte.co.nz",
	            "dev" : ".dev",
	            "test" : ".test",
	            "home" :"",
	            "admin" : "/admin",
	            "host" : "https://raw.github.com/patocallaghan/UrlGenerator/master/"                   
	        };
	    
	    function initEvents(){

	    	//Button Clicks
	    	_$container.find('.btn').on("click", processButtonClick);

	    	//Input fields
	    	_$container.find('input').on('keypress', processInputKeypress);
	    	
	    	//Close Box
	    	_$container.find('.close').on('click', hideGenerator);
	    	$(document).on('keyup', keypressHideGenerator);

	    }

	    //HTML HELPERS
	    function showGenerator() {
	    	moveToTop();
	    	_$container.show();
		   	$(document).on('keyup', keypressHideGenerator);
		}

		function moveToTop () {
			var posTop = window.scrollY + 15;
	    	_$container.css({
	    		top: posTop
	    	});
		}

	    function hideGenerator(e){
	    	e.preventDefault();
	    	_$container.hide();
	    	$(document).off('keyup', keypressHideGenerator);
	    }

	    //EVENT HELPERS
	    function keypressHideGenerator(e){
	    	//esc key
	    	if (e.keyCode == 27) { 
	    		_$container.find('.close').click(); 
	    	}
	    }

	    function processButtonClick (e) {
	    	e.preventDefault();
	    	generateUrls(this);
	    }

	    function processInputKeypress(e) {
	    	if(e.keyCode === 13) {
	    		e.preventDefault();
	    		submitOnEnter(this);
	    	}
	    }

	    function submitOnEnter( input ) {

	    	var button;
	    	var needDev = false,
	    		needTest = false;

	    	_$inputs.each(function(){
	    		var inputValue = this.value;

	    		if(!inputValue) {
	    			return true;
	    		}

	    		if( this.name === "dev" ) {
	    			needDev = true;
	    		} else {
	    			needTest = true;
	    		}

	    	});

	    	if (needDev && needTest) {
	    		button = "both";
	    	} else if ( needDev || needTest ) {
	    		button = "home";
	    	} else {
	    		return false;
	    	}

	    	_$container.find('#' + button).click();
	    }

	    function insertHtml() {

	    	if(!$('#terabyte-url').length) {
	    		$('body').append(_HTML);
	    		_$container = $('#terabyte-url');
	    		_$inputs = _$container.find('input');
	    	}

	    	showGenerator();

	    	return $.Deferred(function( dfd ) {
		        if($('#terabyte-url').length && $('#terabyte-url:visible').length) {
		        	dfd.resolve();
		        } else {
		        	dfd.reject();
		        }
		    }).promise();
	    }

	    function getHtml(){
	      	return $.get(_URL.host + 'urlgenerator.html');
	    }
	    
	    //URL HELPERS
	    function createUrl (url, server, destinationPage) {
	        
	        return _URL._URL_START + url + _URL[server] + _URL._URL_END + _URL[destinationPage];
	        
	    }

	    function goToUrl(url, openInNewWindow){

	    	var destination = "_blank";

	    	if(!openInNewWindow) {
	    		destination = "_self";
	    	}

	    	window.open(url, destination);
	    	
	    }

	    function generateDestinationUrls(btn) {

	    	var url;

	    	var destinations = [],
	    		destinationUrl = btn.id;

	    	_$inputs.each(function(){

	    		var $thisInput = $(this),
	    			server = this.name;

	    		if (!this.value.length) {
	    			return true;
	    		}

	    		if(destinationUrl != 'both') {
	    			destinations.push(createUrl(this.value, server, destinationUrl));
	    		} else {
	    			destinations.push(createUrl(this.value, server, "home"));
	    			destinations.push(createUrl(this.value, server, "admin"));
	    		}

	    	});

	    	return destinations;
	    }

	    function generateUrls(btn){

	        var openInNewWindow = false,
	        	destinationUrls = generateDestinationUrls(btn);
	        
	        for(var i = 0, length = destinationUrls.length; i < length; i++) {

	        	goToUrl(destinationUrls[i], openInNewWindow);

	        	if(!openInNewWindow) {
	        		openInNewWindow = true;
	        	}
	        }
	        
	    }

	    return {
	      	init: function() {
	      		$.when(
			    	insertHtml()
				).then(function(){
			    	initEvents()
				}).fail(function(){
			    	console.error( "URL generator - HTML not appended!" );
				});
	      	},
	      	reInit: function(){
	      		showGenerator();
	      	}
	    };
	  })();

	  // Other things might happen here

	  // expose our module to the global object
	  global.Terabytelet=Terabytelet;
})( window, window.terabyteletLibrary );
Terabytelet.UrlGenerator.init();