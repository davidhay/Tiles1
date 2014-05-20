angular.module('tilesApp').controller('TilesController', function($scope) {

	var initialContents = function(r, c) {
		return '(' + r + ',' + c + ')';
	};
	var tg = new TileGrid(5, 4, initialContents);
	$scope.rows = tg.rows;

});
