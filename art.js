// YOUR ART. This is the only file you need to change.
//
// drawArt(g) runs about 60 times a second. Each run draws one frame of your art.
// Draw into g, not onto the screen: write g.circle(...), not circle(...).
// Your drawing area is g.width wide (1600) and g.height tall (1000), a 16:10 laptop screen.
// Everything you draw here gets stretched onto the surface you set up with the pink corners.
//
// Want a starting point? Open a file in examples/ and copy its drawArt() over this one.
//
// DRAW YOUR OWN: a cheat sheet
// (0, 0) is the TOP-LEFT corner. x grows to the right. y grows DOWN. (1600, 1000) is bottom-right.
// Lines lower in drawArt() paint on top of lines above them.
//
//   g.background(0);              // Fill the frame. 0 is black, and black means no light
//   g.fill(255, 80, 200);         // Color for the next shapes: red, green, blue, each 0 to 255
//   g.circle(400, 300, 200);      // x, y of the center, then size
//   g.rect(100, 100, 150, 80);    // x, y of the top-left corner, then width, height
//   g.stroke(255, 80, 200);       // Lines use stroke color, not fill. Default is black: invisible on black
//   g.strokeWeight(6);            // Line thickness, in pixels
//   g.line(0, 0, 1600, 1000);     // From x, y to x, y
//
// More shapes: g.ellipse(x, y, w, h)   g.triangle(x1, y1, x2, y2, x3, y3)   g.square(x, y, size)
// Outlines: g.noFill(); g.stroke(255); g.strokeWeight(8);
// Full list: https://p5js.org/reference/

// Corners of the bat, from the left wing tip, going clockwise.
// Each pair is a fraction of the frame: x left to right, y top to bottom.
const BAT = [
  [0.05, 0.46], // left wing tip
  [0.12, 0.40],
  [0.20, 0.37],
  [0.28, 0.40],
  [0.33, 0.48], // notch beside the left ear
  [0.37, 0.34],
  [0.42, 0.12], // left ear tip
  [0.47, 0.36],
  [0.50, 0.42], // between the ears
  [0.53, 0.36],
  [0.58, 0.12], // right ear tip
  [0.63, 0.34],
  [0.67, 0.48], // notch beside the right ear
  [0.72, 0.40],
  [0.80, 0.37],
  [0.88, 0.40],
  [0.95, 0.46], // right wing tip
  [0.89, 0.54],
  [0.82, 0.58],
  [0.75, 0.52],
  [0.69, 0.62], // right scallop
  [0.63, 0.54],
  [0.57, 0.66],
  [0.50, 0.78], // bottom tail
  [0.43, 0.66],
  [0.37, 0.54],
  [0.31, 0.62], // left scallop
  [0.25, 0.52],
  [0.18, 0.58],
  [0.11, 0.54],
];

function drawArt(g) {
  g.background(0);

  g.noStroke();
  g.fill(255, 204, 0);
  g.ellipse(g.width / 2, g.height / 2, g.width * 0.96, g.height * 0.9);

  g.fill(0);
  g.beginShape();
  for (const [u, v] of BAT) g.vertex(u * g.width, v * g.height);
  g.endShape(CLOSE);

  // A point on every corner of the bat
  g.fill(255, 0, 255);
  for (const [u, v] of BAT) g.circle(u * g.width, v * g.height, 18);
}
