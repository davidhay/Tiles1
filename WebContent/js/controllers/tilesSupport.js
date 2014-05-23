angular.module('tilesApp').controller('TilesSupportController', function($scope,tilesConfig) {

	this.name="TilesSupportController";

	var imageUrl = tilesConfig.imageUrl;
	var rows = tilesConfig.rows;
	var cols = tilesConfig.cols;
	
	var stylePrefix = "gridTile";
	var styles = {};

	var keyString =  function(row,col){
		return stylePrefix  + '_' + row + '_' + col;
	};

	var ctx = {};
	var styleKeys = [];
	
	//PUBLIC
	$scope.support = ctx;

	//PUBLIC
	ctx.ready = false;

	//PUBLIC
	ctx.styleKeys = styleKeys;

	//PUBLIC
	ctx.getStyle = function(key){		
		return styles[key];
	};
	
	ctx.key1 = 'tile1';
	ctx.value1 = 'background-color:yellow;';
	
	//PUBLIC [to be used image.html ]
	this.getStyleName = function(row,col){
		var key = keyString(row,col);
		return key;
	};

	$scope.$on('supportInitialised',function(){
		console.log('TilesSupport - supportInitiaised event!');
		ctx.ready = true;
	});
	
    var init = function(){
    	var template = ["{"
    	            	,"	  background-image: url(XXXX);"
    	            	,"	  background-position: -POS_Xpx -POS_Ypx;"
    	            	,"	  height: HEIGHTpx;"
    	            	,"	  width: WIDTHpx;"
    	            	,"}"].join("");    	

    	col_width  = Math.floor(this.width  / cols);
		row_height = Math.floor(this.height / rows);
		
		for(var r=0;r<rows;r++){
			for(var c=0;c<cols;c++){
				var key = keyString(r,c); 
				var value = template
						.replace(/XXXX/,img.src)
						.replace(/POS_X/ ,c*col_width)
						.replace(/POS_Y/ ,r*row_height)
						.replace(/HEIGHT/ ,row_height)
						.replace(/WIDTH/ , col_width);
			    console.log('key['+key+']->css['+value+']');
			    styles[key] = value;
			    styleKeys.push(key);
			};
		}
		//PUBLIC
		ctx.ready = true;
		//$scope.$emit('supportInitialised');//up
		$scope.$broadcast('supportInitialised');//down
    };

    //LOAD THE IMAGE AND INITIALISE THINGS
	var img = new Image();
	img.onload = init;
	img.src = imageUrl;
	
});
