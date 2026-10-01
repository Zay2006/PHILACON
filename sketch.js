// projectionMapper — the mapping engine.
// You do not need to change this file. Your art lives in art.js. This file pins it onto a real surface.

const GRID = 10;    // The surface is split into GRID x GRID cells so the image does not bend along the diagonal
const HANDLE = 16;  // Corner handle size, in pixels

let art;            // Offscreen buffer. Your sketch draws here, not on the main canvas
let corners;        // Four points: top-left, top-right, bottom-right, bottom-left
let dragging = -1;  // Index of the corner being dragged, or -1 for none
let moving = false; // true while you drag inside the surface to move all four corners together
let lastMouse;      // Where the mouse was at the last drag event, so each event moves the surface only its own distance
let editing = true; // true shows the handles; press E to hide them for the projector
let cornersPlaced = false; // false until you drag, so fullscreen can still fit the laptop screen

// 16:10 is the usual 16-inch laptop panel (about 13.6 by 8.5 inches).
const LAPTOP_ASPECT = 16 / 10;

// A 16:10 rectangle that fills the window, with a small margin so the handles stay on screen.
function laptopCorners() {
  let w = width * 0.96;
  let h = w / LAPTOP_ASPECT;
  if (h > height * 0.96) {
    h = height * 0.96;
    w = h * LAPTOP_ASPECT;
  }
  const x = (width - w) / 2;
  const y = (height - h) / 2;
  return [
    createVector(x, y),
    createVector(x + w, y),
    createVector(x + w, y + h),
    createVector(x, y + h),
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  art = createGraphics(1600, 1000); // 16:10, matching a 16-inch laptop screen
  corners = laptopCorners();
  if (typeof setupArt === 'function') setupArt(art); // setupArt() is optional. Your art file only needs drawArt()
}

function draw() {
  background(0);
  drawArt(art);
  translate(-width / 2, -height / 2); // WEBGL puts (0, 0) in the center. Move it to the top-left like 2D mode
  drawWarped(art, corners);
  if (editing) drawHandles();
}

// Stretch img across the four corners, one row of small cells at a time.
function drawWarped(img, c) {
  noStroke();
  textureMode(NORMAL);
  texture(img);
  for (let row = 0; row < GRID; row++) {
    beginShape(TRIANGLE_STRIP);
    for (let col = 0; col <= GRID; col++) {
      const u = col / GRID;
      for (const v of [row / GRID, (row + 1) / GRID]) {
        const p = pointAt(c, u, v);
        vertex(p.x, p.y, 0, u, v);
      }
    }
    endShape();
  }
}

// Blend the four corners. u runs left to right, v runs top to bottom, both from 0 to 1.
function pointAt(c, u, v) {
  const top = p5.Vector.lerp(c[0], c[1], u);
  const bottom = p5.Vector.lerp(c[3], c[2], u);
  return p5.Vector.lerp(top, bottom, v);
}

function drawHandles() {
  push();
  translate(0, 0, 1); // Lift the handles just above the image so the image never hides them
  stroke(255, 0, 255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (const p of corners) vertex(p.x, p.y);
  endShape(CLOSE);
  noStroke();
  fill(255, 0, 255);
  for (const p of corners) circle(p.x, p.y, HANDLE);
  pop();
}

function mousePressed() {
  if (!editing) return;
  dragging = corners.findIndex((p) => dist(mouseX, mouseY, p.x, p.y) < HANDLE);
  moving = dragging < 0 && insideQuad(mouseX, mouseY, corners); // No corner hit? Then check for a click inside the surface
  lastMouse = createVector(mouseX, mouseY);
}

function mouseDragged() {
  if (dragging >= 0 || moving) cornersPlaced = true;
  if (dragging >= 0) corners[dragging].set(mouseX, mouseY);
  if (moving) {
    const step = createVector(mouseX, mouseY).sub(lastMouse); // How far the mouse moved since the last drag event
    for (const p of corners) p.add(step);
  }
  lastMouse = createVector(mouseX, mouseY);
}

function mouseReleased() {
  dragging = -1;
  moving = false;
}

// Is (x, y) inside the shape? Count how many edges a line from the point to the right crosses. Odd means inside.
function insideQuad(x, y, c) {
  let inside = false;
  for (let i = 0, j = c.length - 1; i < c.length; j = i++) {
    const crosses = c[i].y > y !== c[j].y > y;
    if (crosses && x < ((c[j].x - c[i].x) * (y - c[i].y)) / (c[j].y - c[i].y) + c[i].x) {
      inside = !inside;
    }
  }
  return inside;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (!cornersPlaced) corners = laptopCorners();
}

function keyPressed() {
  if (key === 'f' || key === 'F') {
    fullscreen(!fullscreen());
  }
  if (key === 'e' || key === 'E') {
    editing = !editing;
    editing ? cursor() : noCursor();
  }
}
