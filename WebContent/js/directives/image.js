angular.module('tilesApp').directive('tileImage', function() {
    return {
      // Enforce the angularJS default of restricting the directive to
      // attributes only
      restrict: 'E',
      transclude: false,
      templateUrl: 'image.html',      
      scope : {
    	  row  : "=row",
    	  col  : "=col",
    	  
      },
      require : '^tilesSupport', //will make the 'controller' for this directive, the controller for the parent 'tiles-support' directive which is the 'TilesSuportController'
      link: function(scope, element, attrs, controller) {
    	  //console.log('CONTROLLER IS',controller);
    	  scope.show = function(){
    		  var result = scope.row >= 0  && scope.col >= 0;
    		  return result;
    	  };
    	  scope.getClass = function() {
    		  //console.log('row is',scope.row);
    		  //console.log('col is',scope.col);    		  
    		  var result = controller.getStyleName(scope.row,scope.col);
    		  //console.log('getClass(row,col) is',result);
    		  return result;
    	  };
      }
    };
  });
console.log('image js loaded');
