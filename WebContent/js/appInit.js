angular.module('tilesApp').config(function (tilesConfigProvider) {
	console.log('tilesConfigProvider',tilesConfigProvider);
	tilesConfigProvider.setRows(3);	
	tilesConfigProvider.setCols(3);
});
