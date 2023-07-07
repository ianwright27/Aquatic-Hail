
let tumbler, x, y, sides, len, angle;
let num_objects = 100; 
let elements = []; 
let obj_colors;
obj_colors = ["#006b7e", "#0096b2", "#01d7ff", "#01e6fc", "#01a1b0"]; 
// obj_colors = ["#006b7e", "#0096b2", "#01d7ff", "#74F3FF", "#01a1b0"]; 
// obj_colors = ["#036d06","#fcbe03", "#cc141b","#230b99", "#f1e0c5","#fc4d0d" ]; 
// obj_colors = [  "#38c5f0","#230b99", "#cc9f2f", "#3939e5" ];

// capture
let allow_record = false; 
let capturer;
let videoDuration = 25; // Duration in seconds
let isRecording = false;
let isSaved = false; 
let bg;



function setup() {
  
	new Canvas('9:16');
	world.gravity.y = 10;

  
  // capture
  capturer = new CCapture({
    format: 'webm',
    framerate: 60
  });
  
	x = width * 0.5;
	y = height * 0.5;
	sides = 12;
	// len = height / sides * .6;
	len = height / sides ; 
  console.log(len) 
  // len = 80; 
	angle = 360 / sides;

	let s = [len, angle, len, -angle, len, angle, sides];
	tumbler = new Sprite(x, y, s, 'kinematic');
	tumbler.rotationSpeed = 0.6;
	tumbler.shapeColor = '#01e6fc';

	allSprites.remove(tumbler);
	// dropSprite(); 

    for (let i =0; i < num_objects; ++i) {
      dropSprite(); 
    } 


    let changeDirection = setInterval(function(){
      tumbler.rotationSpeed = -(tumbler.rotationSpeed); 
    }, 4000); 
  

    frameRate(60); 
    bg = "#000"; 
  
}

function draw() {
	background(bg);
	push();
	strokeWeight(0); 
	strokeJoin(ROUND);
	tumbler.draw();
	pop();
	
	// if (mouse.presses()) { 
	// tumbler.rotationSpeed = random(0.5, 0.9)
	// 	dropSprite();
	// }
  
  
    // stroke(random(100, 255), 33, random(84, 180)); 
  if (random() > .08) {
  stroke(0, 0, 0); 
  } else {
    stroke(random(200, 255), random(100, 200), random(40, 44)); 
  }
  
	allSprites.draw(); 
  // noLoop(); 

  // capture
  if (allow_record) {
    if (!isRecording && !isSaved) {
      startCapture();
    }

    if (isRecording) {
      capturer.capture(canvas);
    }

    if (frameCount >= videoDuration * 60 && !isSaved) {
      stopCapture();
    }
  }
}


function startCapture() {
  isRecording = true;
  capturer.start();
}

function stopCapture() {
  isRecording = false;
  capturer.stop();
  capturer.save();
  isSaved = true;
}

function dropSprite() { 
  
	sides = random([12, 5, 6, 6, 6]);
	len = height / sides * .6;
	angle = 360 / sides;

	// len = (height * random(0.1, 0.3)) / sides;
	len = (height * random(0.01, 0.35)) / sides;
	let penta = new Sprite(mouse.x || x, mouse.y || y, [len, angle, sides]);
	penta.shapeColor = random(obj_colors); 
    
    // add to element
    elements.push(penta); 
}



function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('myCanvas', 'png'); // Save the canvas as an image with the filename "myCanvas.png"
  }
}
		