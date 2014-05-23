angular.module('tilesApp').controller('TilesController', function($scope,$timeout,$sce,tilesConfig) {

	this.name = 'TilesController';
	
	var initialContents = function(r, c) {
	    return {
	    	row : r,
	    	col : c
	    };
	};
	var tg = new TileGrid(tilesConfig.rows,tilesConfig.cols, initialContents);
	$scope.rows = tg.rows;
	
	$scope.resetting = false;
	$scope.randomizing = false;
	
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
	
	$scope.randomize = function(target) {
		if ($scope.randomizing) {
			console.log('already randomizing!');
			return;
		}
		$scope.randomizing = true;
		function randomizeInternal(target){
			if(target == 0){
				$scope.randomizing = false;
				return;
			}
			tg.randomMove();
			$timeout(function(){
				randomizeInternal(target-1);
			},100);
		};
		randomizeInternal(target);
	};

});
