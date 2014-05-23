angular.module('tilesApp').config(function (tilesConfigProvider) {
	console.log('tilesConfigProvider',tilesConfigProvider);
	tilesConfigProvider.setRows(3);	
	tilesConfigProvider.setCols(3);
	tilesConfigProvider.setImageUrl("http://localhost:8080/tiles/images/Scottish-Lion.jpg");
});
