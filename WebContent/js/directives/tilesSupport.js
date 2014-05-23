angular.module('tilesApp').directive('tilesSupport', function() {
    return {
      restrict: 'A',
      transclude: true,
      templateUrl: 'tilesSupport.html',
      scope: true,
      controller: 'TilesSupportController',
      link: function(scope, element, attrs, controller) {
    	  
    	  var init = function(){
    		  //console.log('TilesSupport directive - init called!');
        	  //console.log('scope is',scope);
        	  var raw = '<style>';
        	  raw += '.tile {background-color:yellow;}\n';
        	  
        	  var keys = scope.support.styleKeys;
        	  //console.log('KEYS are',keys);
        	  angular.forEach(scope.support.styleKeys,function(key){
        		  //console.log("KEY IS",key);
        		  raw += '.'+key+' '+scope.support.getStyle(key)+'\n';
        	  });
        	  raw += '</style>';
        	  //console.log("RAW IS",raw);
        	  var style = angular.element(raw);
        	  element.prepend(style);
    	  };
    	  
    	  scope.$on('supportInitialised',init);

      }
    };
  });
