angular.module('tilesApp').directive('tiles', function() {
    return {
      // Enforce the angularJS default of restricting the directive to
      // attributes only
      restrict: 'E',
      transclude: false,
      templateUrl: 'tiles.html',      
      scope: true,
      link: function(scope, element, attrs, controller) {
    	  
      }
    };
  });
