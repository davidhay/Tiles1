angular.module('tilesApp').config(function (tilesConfigProvider) {
	console.log('tilesConfigProvider',tilesConfigProvider);
	tilesConfigProvider.setRows(4);	
	tilesConfigProvider.setCols(4);
	tilesConfigProvider.setImageUrl("http://localhost:8080/tiles/images/Scottish-Lion.jpg");
});
