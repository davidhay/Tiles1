angular.module('tilesApp').directive('tile', function() {
    return {
      restrict: 'E',
      transclude: false,
      templateUrl: 'tile.html',
      scope : {
    	  model  : "=model", 	  
      },
      link: function(scope, element, attrs) {
    	  console.log('model is',scope.model);
    	  scope.select = function(){
    		  console.log('click event being processed!', new Date());
    		  scope.model.select();
    	  };
      }
    };
  });
