var TileGridException = function(message) {
   this.message = message;
   this.name = "TileGridException";
};
var TileGrid = function(num_rows, num_cols, getInitial) {
	console.log(num_rows, num_cols, getInitial);	
	this.num_rows = num_rows;
	this.num_cols = num_cols;
	var that = this;
	this.rows = new Array(num_rows);
	for ( var r = 0; r < num_rows; r++) {
		var row = new Array(num_cols);
		for ( var c = 0; c < num_cols; c++) {
			var initial = getInitial(r, c);
			var tile = {
				r : r,
				c : c,
				value : initial,
				select : function() {					
					console.log('select',this.name);
					that.selectCell(this.r, this.c);
				}
			};
			row[c] = tile;
			console.log('tile value',tile.value);
		}
		;
		console.log('empty row is', row);
		this.rows[r] = row;
	}// for loop


	// 0,0 is top,left of grid!
	// 2,5 is the 2nd row, 5th column

	this.hole = {
			r:2,
			c:2,
			above : function(){
				return {r:this.r-1, c:this.c };
			},
			below : function(){
				return {r:this.r+1, c:this.c };
			},
			left : function(){
				return {r:this.r, c:this.c-1 };
			},
			right : function(){
				return {r:this.r, c:this.c+1 };
			},
			tile : function(){
				return that.rows[this.r][this.c];
			},
			update : function(r,c){
				this.r = r;
				this.c = c;
			}
	};
	
	this.hole.tile().value ='';

	console.log('hole',this.hole);
	console.log('hole : above',this.hole.above());
	console.log('hole : below',this.hole.below());
	console.log('hole : left',this.hole.left());
	console.log('hole : right',this.hole.right());
	
	this.swap = function(coords){
		console.log('swap with r=['+coords.r+']c=['+coords.c+']');		
		var other = this.rows[coords.r][coords.c];
		this.hole.tile().value = other.value;
		other.value = null;
		this.hole.update(coords.r,coords.c);		
	};
	this.moveHoleUp = function(){
		 console.log('moveHoleUp');
		 this.swap(this.hole.above());
	};
	this.moveHoleDown = function(){
		console.log('moveHoleDown');
		this.swap(this.hole.below());
	};
	this.moveHoleLeft = function(){
		console.log('moveHoleLeft');
		this.swap(this.hole.left());
	};
	this.moveHoleRight = function(){
		console.log('moveHoleRight');
		this.swap(this.hole.right());
	};
	this.reverse = function(move){
		switch(move){
			case this.moveHoleUp    : return this.moveHoleDown(); break;
			case this.moveHoleDown  : return this.moveHoleUp(); break;
			case this.moveHoleLeft  : return this.moveHoleRight(); break;
			case this.moveHoleRight : return this.moveHoleLeft(); break;
			default  : throw new TileGridException("problem trying to get reverse for "+move);
		}
	};
	
	this.selectCell = function(r, c) {
		console.log('selectCell',r,c);
		var slideVertical = function() {
			console.log('slideVertical');
			do {
				r < that.hole.r ? that.moveHoleUp() : that.moveHoleDown();
			} while (that.hole.r != r);
		};
		var slideHorizontal = function() {
			console.log('slideHorizontal');
			do {
				c < that.hole.c ? that.moveHoleLeft() : that.moveHoleRight();
			} while (that.hole.c != c );
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

		if (r == that.hole.r) {
			console.log('selected cell is on same row as hole');
			slideHorizontal();
		} else if (c == that.hole.c) {
			console.log('selected cell is on same column as hole');
			slideVertical();
		}

	};

};