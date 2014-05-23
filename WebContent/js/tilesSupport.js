var TilesSupport = function(imageURL, stylePrefix, rows, cols, $document) {

	this.stylePrefix = stylePrefix;
	
	this.rows = rows;
	this.cols = cols;
	this.image = image;
	
	var img = new Image();
	img.onload = function() {
	  alert(this.width + 'x' + this.height);
	};
	img.src = imageURL;
	
};

/*
$(document).ready(function() {
      alert("document ready occurred!");
});

$(window).load(function() {
      alert("window load occurred!");
});
*/


/**
var styles = {};
	
	function addStyle(name, body){
	    head = document.head || document.getElementsByTagName('head')[0],
	    style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);	
	}


}
*/