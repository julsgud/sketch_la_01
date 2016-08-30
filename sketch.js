//  los adoro
//  by Julio Gudiño

//// global

var myCanvas;
var palette = ['#1e1a1b', '#f3d3c4', '#f0f1ec'];
var triangles = [];
var triangleCount = 8;
var fps = 28;
var scaler = 55;
var windowScaler = 2.3;
var direction = "right";
var font;

//// class

function Triangle(a, b, c, d, e, f, colour) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.e = e;
  this.f = f;
  this.colour = colour;
  this.display = function() {
    noStroke();
    fill(this.colour);
    triangle(this.a, this.b, this.c, this.d, this.e, this.f);
  }
}

//// sketch

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  frameRate(fps);
  randomSeed(200);
  initTriangles();
}

function draw() {
  background(palette[2]);
  
  // display squares
  for (var i = 0; i < triangles.length; i++) {
    triangles[i].display();
  }
  
  fill(palette[0]);
  rectMode(CENTER);
  rect(width*.33, height*.75, 160*windowScaler, 90*windowScaler);

  drawText();
}

//// canvas

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initTriangles();
}

//// export

function getTimestamp() {
  var now = new Date();
  var hrs = now.getHours();
  var mins = now.getMinutes();
  var secs = now.getSeconds();
  var dd = now.getDate();
  var mm = now.getMonth() + 1; // january is 0
  var yyyy = now.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  } 

  if (mm < 10) {
    mm = '0' + mm;
  } 
  
  if (secs < 10) {
    secs = '0' + secs;
  }

  now = mm + dd + yyyy + '_' + hrs + mins + secs;

  return now;
}

function keyTyped() {
  
  if (key == 's' || key == 'S') {
    saveCanvas(myCanvas, 'la_' + getTimestamp(), 'png');
  }
  
  return false; 
}

function drawText() {
  push();
  fill(palette[0]);
  textSize(64);
  rotate(radians(13));
  text("Los Adoro", width*.5, height/180);
  pop();
}

function initTriangles() {
  if (direction === "right") {
    var a = 0;
    var b = 0;
    var c = width;
    var d = 0;

    for (var i = 0; i < triangleCount; i++) {
      var e = width;
      var f = height*.80 - i * scaler;
      var randomColor = Math.floor(random(0, palette.length));
      triangles[i] = new Triangle(a, b, c, d, e, f, palette[randomColor]);
    }

  } else {
    var a = width;
    var b = width;
    var c = 0;
    var d = width;

    for (var i = 0; i < triangleCount; i++) {
      var e = 0;
      var f = height*.75 - i * scaler;
      var randomColor = Math.floor(random(0, palette.length));
      triangles[i] = new Triangle(a, b, c, d, e, f, palette[randomColor]);
    }
  }
}
