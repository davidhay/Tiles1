angular.module('tilesApp').controller('TilesController', function($scope,$timeout,$sce) {

	var initialContents = function(r, c) {
	    return {
	    	row : r,
	    	col : c
	    }
	};
	var tg = new TileGrid(3, 3, initialContents);
	$scope.rows = tg.rows;
	
	$scope.resetting = false;
	$scope.reset = function() {
		if ($scope.resetting) {
			console.log('already resetting!');
			return;
		}
		$scope.resetting = true;
		
		function resetInternal(){
			if(tg.getMoveCount() == 0){
				console.log('all reset!');
				$scope.resetting = false;
			}else{
				tg.goBackOneMove();
				$timeout(resetInternal, 200);
			}
		};
		resetInternal();
	};

});
