var bird;
var pipes = [];
var score = 0;
var hit = false;
var play = true;
var run = 0;

function setup() {
	createCanvas(600, 600);
	buttonAgain = createButton('Nochmal');
	buttonAgain.position(width/2, height/2 + 10);
	buttonAgain.mousePressed(reset);
	buttonAgain.hide();
	
	buttonBack = createButton('Zurück');
	buttonBack.position(width/2 - 80 , height/2 + 10);
	buttonBack.mousePressed(back);
	buttonBack.hide();
	
	bird = new Bird();
}

function draw() {
	background(98,195,203);
	
	for(var i = pipes.length-1; i >= 0; i--) {
		pipes[i].show();
		if(play){
			pipes[i].update();
		}
		
		if(pipes[i].hits(bird)) {
			hit = true;
			play = false;
		}

		if(pipes[i].offscreen()) {
			pipes.splice(i, 1);
		}
  }
	
	if(play){
		bird.update();
		bird.show();
	}
	
	if(run % 75 == 0) {
		pipes.push(new Pipe());
	}
	if(run % 75 == 35 && run > 35 && (!hit)) {
		score = score + 10;
	}
	 

	//scoreboard
	fill(238, 238, 238, 200);
	rect(450, 5, 140, 20);
	fill(0);
	textSize(16);
	textAlign(LEFT);
	text("Score:", 460, 20);
	textAlign(RIGHT);
	text(score, 580, 20);
	  
	if(play) {
		run++;
	}else{
		buttonAgain.show();
		buttonBack.show();
	}		
}

function reset() {
  score = 0;
  pipes = [];
  bird = new Bird();
  run = 0;
  buttonAgain.hide();
  buttonBack.hide();
  hit = false;
  play = true;
}

function back() {
	window.location = "/index.php";
}


function keyPressed() {
	if(key == ' ') {
	bird.up();	
	}
}