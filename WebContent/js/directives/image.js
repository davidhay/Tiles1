angular.module('tilesApp').directive('tileImage', function() {
    return {
      // Enforce the angularJS default of restricting the directive to
      // attributes only
      restrict: 'E',
      transclude: false,
      templateUrl: 'image.html',      
      scope : {
    	  row  : "=row",
    	  col  : "=col"
      },
      link: function(scope, element, attrs, controller) {
    	  scope.show = function(){
    		  var result = scope.row >= 0  && scope.col >= 0;
    		  return result;
    	  };
      }
    };
  });
console.log('image js loaded');
