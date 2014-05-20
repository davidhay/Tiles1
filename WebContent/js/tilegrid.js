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


	console.log('rows are ', this.rows);

	// 0,0 is top,left of grid!
	// 2,5 is the 2nd row, 5th column

	this.hole_r = 2;
	this.hole_c = 2;

	var tile = this.rows[this.hole_r][this.hole_c];
	tile.value = '';// the hole has no contents.

	this.selectCell = function(r, c) {
		
		console.log('select cell row=',r,'cell=',c);
		
		var row = that.rows[r];
		var holeLeftOrRight = function(next_c) {
			var contents_next = row[next_c].value;
			row[that.hole_c].value = contents_next; // old hole
			that.hole_c = next_c;
			row[that.hole_c].value = null; // new hole		
		};
		var holeLeft = function() {
			if (that.hole_c == 0) {
				throw new Exception("cannot move hole left!");
			}
			var next_c = that.hole_c - 1;
			holeLeftOrRight(next_c);
		};
		var holeRight = function() {			
			if (that.hole_c + 1 == num_cols) {
				throw new Exception("cannot move hole right!");
			}
			var next_c = that.hole_c + 1;
			holeLeftOrRight(next_c);
		};
		var holeUpOrDown = function(next_r){
			var contents_next = that.rows[next_r][c].value;
			that.rows[that.hole_r][c].value = contents_next; // old hole
			that.hole_r = next_r;
			that.rows[that.hole_r][c].value = null; // new hole
		};
		var holeUp = function() {
			if (that.hole_r == 0) {
				throw new Exception("cannot move hole up!");
			}
			console.log('holeUp');
			var next_r = that.hole_r - 1;
			holeUpOrDown(next_r);
		};
		var holeDown = function() {
			if (that.hole_r + 1 == that.num_rows) {
				throw new Exception("cannot move hole up!");
			}
			console.log('holeDown');
			var next_r = that.hole_r + 1;
			holeUpOrDown(next_r);
		};
		var slideVertical = function() {
			console.log('slideVertical');
			do {
				r < that.hole_r ? holeUp() : holeDown();
			} while (that.hole_r != r);
		};
		var slideHorizontal = function() {
			console.log('slideHorizontal');
			do {
				c < that.hole_c ? holeLeft() : holeRight();
			} while (that.hole_c != c );
		};
		if (r < 0 || r >= that.num_rows) {
			return;
		}
		if (c < 0 || c >= that.num_cols) {
			return;
		}
		if (c == that.hole_c && r == that.hole_r) {
			return;
		}

		if (r == that.hole_r) {
			console.log('selected cell is on same row as hole');
			slideHorizontal();
		} else if (c == that.hole_c) {
			console.log('selected cell is on same column as hole');
			slideVertical();
		}

	};

	this.getContent = function(r, c) {
		return grid[r][c];
	};

};