var TileGridException = function(message) {
   this.message = message;
   this.name = "TileGridException";
};
var Tile = function(r,c,tileGrid){
	
	//If i create it like this, the methods keep the constructor values and I don't have to use this everywhere!!!
	
	this.value = null;
	this.above = function(){
		return tileGrid.getTile(r-1,c);
	};
	this.below = function(){
		return tileGrid.getTile(r+1,c);
	};
	this.left = function(){
		return tileGrid.getTile(r,c-1);
	};
	this.right = function(){
		return tileGrid.getTile(r,c+1);
	};
	this.getValue = function(){
		return this.value;
	};
	this.setValue = function(value){
		this.value = value;
	};
	this.isAbove = function(row){
		return r < row;
	};
	this.isLeft = function(col){
		return c < col;
	};
	this.swapValues = function(otherTile) {
		var temp = otherTile.getValue();
		otherTile.setValue(this.value);
		this.setValue(temp);
	};
	this.select = function() {
		console.log('select',this.name);
		tileGrid.selectCell(r, c);
	};
	this.isSameRow = function(row){
		return r == row;
	};
	this.isSameColumn = function(col){
		return c == col;
	};
	this.rowsAboveThis = function(row){
		return r - row;
	};
	this.colsLeftThis = function(col){
		return c - col;
	};
};

// 0,0 is top,left of grid!
// 2,5 is the 2nd row, 5th column

var TileGrid = function(num_rows, num_cols, getInitial) {
	
	var moves = [];
	var that = this;
	console.log(num_rows, num_cols, getInitial);	
	
	this.rows = new Array(num_rows);

	this.getTile = function(r,c){
		return this.rows[r][c];
	};
	this.moveHole = function(tile){
		this.hole.swapValues(tile);
		this.hole = tile;
	};
	var moveHoleUp = function(){
		 this.moveHole(this.hole.above());
	};
	var  moveHoleDown = function(){
		this.moveHole(this.hole.below());
	};
	var moveHoleLeft = function(){
		 this.moveHole(this.hole.left());
	};
	var moveHoleRight = function(){
		 this.moveHole(this.hole.right());
	};
	this.addMove = function(move){
		moves.push(move);
	};
	
	this.goBackOneMove = function() {
		var reverse = function(move) {
			console.log('reverse : move is ',move);
			var result;
			if (move === moveHoleUp) {
				result = moveHoleDown;
				
			} else if (move === moveHoleDown) {
				result = moveHoleUp;
				
			} else if (move === moveHoleLeft) {
				result = moveHoleRight;
				
			} else if (move === moveHoleRight) {
				result = moveHoleLeft;
				
			} else {
				throw new TileGridException("problem trying to get reverse for " + move);
			}
			return result;
		};
		if (moves.length > 0) {
			var move = moves.pop();
			var opp = reverse(move);
			opp.apply(this);
		};
	};
	this.getMoveCount = function(){
		return moves.length;
	};
	this.selectCell = function(r, c) {
		console.log('selectCell', r, c);
		var slideVertical = function() {
			var rowsAbove = that.hole.rowsAboveThis(r);
			console.log('rows above',rowsAbove);
			var fn = (rowsAbove > 0) ? moveHoleUp : moveHoleDown;
			var moves = Math.floor(Math.abs(rowsAbove));
			for(var i=0;i<moves;i++){				
				fn.call(that);
				that.addMove(fn);
			};
		};
		var slideHorizontal = function() {
			var colsLeft = that.hole.colsLeftThis(c);
			console.log('cols left',colsLeft);
			var fn = (colsLeft > 0) ? moveHoleLeft : moveHoleRight;
			var moves = Math.floor(Math.abs(colsLeft));			
			for(var i=0;i<moves;i++){
				fn.call(that);
				that.addMove(fn);				
			};
		};
		if (r < 0 || r >= that.num_rows) {
			return;
		}
		if (c < 0 || c >= that.num_cols) {
			return;
		}
		if (c == that.hole.c && r == that.hole.r) {
			return;
		}
		
		if (that.hole.isSameRow(r)) {
			slideHorizontal();
		} else if (that.hole.isSameColumn(c)) {
			slideVertical();
		};

	};

	for ( var r = 0; r < num_rows; r++) {
		var row = new Array(num_cols);
		for ( var c = 0; c < num_cols; c++) {
			var initial = getInitial(r, c);
			var tile = new Tile(r,c,this);
			tile.setValue(initial);
			row[c] = tile;
			console.log('tile value',tile.value);
		};
		this.rows[r] = row;
	}// for loop
	
	this.hole = this.getTile(2,2);
	this.hole.setValue('');

};