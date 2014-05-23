angular.module('tilesApp').provider("tilesConfig", function () {
  var rows=1;
  var cols=1;
  var imageUrl=null;
  return {
    setRows : function(r){
    	rows=r;
    },
    setCols : function(c){
    	cols=c;
    },
    setImageUrl : function(url){
          imageUrl = url;
    },
    $get: function () {
      return {
        rows : rows,
        cols : cols,
        imageUrl : imageUrl
      };
    }
  };
});
 
