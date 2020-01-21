var grid;
var score = 0;


function isGameOver() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (grid[i][j] == 0) {
				return false;
			}
			if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
				return false;
			}
			if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
				return false;
			}
		}
	}
	return true;
}

function isGameWon() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (grid[i][j] == 2048) {
				return true;
			}
		}
	}
	return false;
}


function blankGrid() {
		return [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
}

function setup() {
	createCanvas(400, 400);
	buttonAgain = createButton('Nochmal');
	buttonAgain.position(width/2, height/2 + 10);
	buttonAgain.mousePressed(reset);
	buttonAgain.hide();

	buttonBack = createButton('Zurück');
	buttonBack.position(width/2 - 80 , height/2 + 10);
	buttonBack.mousePressed(back);
	buttonBack.hide();

	noLoop();
	grid = blankGrid();
	grid_new = blankGrid();
	addNumber();
	addNumber();
	updateCanvas();
}

function addNumber() {
	var options = [];
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (grid[i][j] === 0) {
				options.push({
					x: i,
					y: j
			});
		}
	}
}
if(options.length > 0) {
	var spot = random(options);
	var r = random(1);
	grid[spot.x][spot.y] = r > 0.1 ? 2 : 4;
	}
}

function compare(a,b) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(a[i][j] !== b[i][j]) {
				return true;
			}
		}
	}
	return false;
}


function copyGrid(grid) {
	var extra = blankGrid();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			extra[i][j] = grid[i][j];
		}
	}
return extra;
}

function flipGrid(grid) {
	for (var i = 0; i < 4; i++) {
		grid[i].reverse();
	}
	return grid;
}

function transposeGrid(grid, direction) {
	var newGrid = blankGrid();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (direction == 1) {
				newGrid[i][j] = grid[j][i];
			} else {
				newGrid[j][i] = grid[i][j];
			}
		}
	}
	return newGrid;
}


function keyPressed() {

	var flipped = false;
	var rotated = false;
	var played = true;
	switch(keyCode) {
		case 83:			//DOWN
		//Nothing
		break;
		case 87:			//UP
		grid = flipGrid(grid);
		flipped = true;
		break;
		case 68:		//RIGHT
		grid = transposeGrid(grid, 1);
		rotated = true;
		break;
		case 65:			//LEFT
		grid = transposeGrid(grid, 1);
		grid = flipGrid(grid);
		rotated = true;
		flipped = true;
		break;
		default:
		played = false;
	}

		if (played) {
		var past = copyGrid(grid);
		for ( var i = 0; i < 4; i++) {
			grid[i] = operate(grid[i]);
		}
		var changed = compare(past, grid);
		if (flipped) {
			grid = flipGrid(grid);
		}

		if (rotated) {
			grid = transposeGrid(grid, -1);
		}

		if (changed) {
			addNumber();
		}
		updateCanvas();

		var gameover = isGameOver();
		if (gameover) {
				select('#score').html(score + " Sie haben verloren");
			buttonAgain.show();
			buttonBack.show();
		}
		var gamewon = isGameWon();
		if (gamewon) {
				select('#score').html(score + " Sie haben gewonnen!");
			buttonAgain.show();
			buttonBack.show();
		}
	}
}

function back() {
	window.location = "/index.php";
}

function reset() {
	window.location = "index.php"
}

function operate(row) {
	row = slide(row);
	row = combine(row);
	row = slide(row);
	return row;

}


function updateCanvas() {
	background(255);
	drawGrid();
	select('#score').html(score);
}

function slide(row) {
	var arr = row.filter(val => val);
	var missing = 4 - arr.length;
	var zeros = Array(missing).fill(0);
	arr = zeros.concat(arr);
	return arr;
}

function combine(row) {
	for (var i = 3; i >= 1; i--) {
		var a = row [i];
		var b = row[i - 1];
		if (a==b) {
			row[i] = a + b;
			score += row[i];
			row[i - 1] = 0;
		}
	}
	return row;
}



function drawGrid() {
	var w = 100;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			noFill();
			strokeWeight(2);
			var val = grid[i][j];
			var s = val.toString();
			stroke(0);
			if (val != 0) {
				fill(colorsAndSizes[s].color);
				stroke(0);
			} else {
				noFill();
			}
			rect(i * w, j * w, w, w);
			if (grid[i][j] !== 0) {
				textAlign(CENTER, CENTER);
				noStroke();
				fill(0);
				textSize(colorsAndSizes[s].size);
				text(val, i * w + w / 2, j * w + w / 2);
			}
		}
	}
}
