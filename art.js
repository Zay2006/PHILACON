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
  [0.02, 0.50], // left wing tip
  [0.16, 0.40],
  [0.28, 0.34],
  [0.34, 0.44], // notch beside the left ear
  [0.40, 0.08], // left ear tip
  [0.47, 0.36],
  [0.50, 0.42], // between the ears
  [0.53, 0.36],
  [0.60, 0.08], // right ear tip
  [0.66, 0.44],
  [0.72, 0.34],
  [0.84, 0.40],
  [0.98, 0.50], // right wing tip
  [0.86, 0.62],
  [0.74, 0.54],
  [0.66, 0.74],
  [0.58, 0.60],
  [0.50, 0.86], // bottom tail
  [0.42, 0.60],
  [0.34, 0.74],
  [0.26, 0.54],
  [0.14, 0.62],
];

function drawArt(g) {
  g.background(0);

  g.noStroke();
  g.fill(255, 204, 0);
  g.beginShape();
  for (const [u, v] of BAT) g.vertex(u * g.width, v * g.height);
  g.endShape(CLOSE);

  // A point on every corner of the bat
  g.fill(255, 0, 255);
  for (const [u, v] of BAT) g.circle(u * g.width, v * g.height, 22);
}
