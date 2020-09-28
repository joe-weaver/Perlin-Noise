document.onload = main();

function main(){
	let cellSizeSlider = document.getElementById("cellSizeSlider");
	let zSlider = document.getElementById("zSlider");
	let cvs = document.getElementById("cvs");
	let ctx = cvs.getContext("2d");
	let p = new Perlin();

	let CELL_SIZE = cellSizeSlider.value;
	let z = zSlider.value/100;
	let WIDTH = cvs.width;
	let HEIGHT = cvs.height;

	render(CELL_SIZE, ctx, p, WIDTH, HEIGHT, z);

	
	cellSizeSlider.oninput = () => {
		CELL_SIZE = cellSizeSlider.value;
		render(CELL_SIZE, ctx, p, WIDTH, HEIGHT, z);
	}

	zSlider.oninput = () => {
		z = zSlider.value/100;
		render(CELL_SIZE, ctx, p, WIDTH, HEIGHT, z);
	}
}

function render(CELL_SIZE, ctx, p, WIDTH, HEIGHT, z){
	let NUM_ROWS = parseInt(HEIGHT/CELL_SIZE);
	let NUM_COLS = parseInt(WIDTH/CELL_SIZE);

	let cells = new Float32Array(NUM_ROWS*NUM_COLS);

	// Calculate perlin values
	for(let x = 0; x < NUM_ROWS; x++){
		for(let y = 0; y < NUM_COLS; y++){
			cells[x*NUM_COLS + y] = p.perlin(x/10, y/10, z);
		}
	}

	// Draw the values
	for(let x = 0; x < NUM_ROWS; x++){
		for(let y = 0; y < NUM_COLS; y++){
			ctx.fillStyle = "rgb(" + cells[x*NUM_COLS + y]*255 + ", " + cells[x*NUM_COLS + y]*255 + ", " + cells[x*NUM_COLS + y]*255 + ")";
			ctx.fillRect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
		}
	}
}