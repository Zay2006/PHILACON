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

// Hourglass, measured from the center of the face. 1 is the edge of the circle.
const GLASS = [
  [-0.55, -0.61],
  [0.55, -0.61],
  [0.11, 0],
  [0.55, 0.61],
  [-0.55, 0.61],
  [-0.11, 0],
];

const FACE = 280; // Diameter. Leaves room to travel, like the DVD logo.
const STEP_X = 8;
const STEP_Y = 6;

let logoX = 0;
let logoY = 0;
let velX = STEP_X;
let velY = STEP_Y;
let cornerGlow = 0;

function setupArt() {
  logoX = 0;
  logoY = 0;
  velX = STEP_X;
  velY = STEP_Y;
}

function drawArt(g) {
  g.background(0);

  const maxX = g.width - FACE;
  const maxY = g.height - FACE;
  logoX += velX;
  logoY += velY;

  let hitX = false;
  let hitY = false;
  if (logoX <= 0 || logoX >= maxX) {
    logoX = Math.max(0, Math.min(maxX, logoX));
    velX *= -1;
    hitX = true;
  }
  if (logoY <= 0 || logoY >= maxY) {
    logoY = Math.max(0, Math.min(maxY, logoY));
    velY *= -1;
    hitY = true;
  }
  // Both edges in one frame means a corner, the same wait as the old DVD logo.
  if (hitX && hitY) cornerGlow = 1;
  cornerGlow *= 0.94;

  const cx = logoX + FACE / 2;
  const cy = logoY + FACE / 2;
  const pulse = 0.55 + 0.45 * Math.sin(frameCount * 0.07);
  const bloom = 28 + pulse * 22 + cornerGlow * 70;

  g.noStroke();
  for (let i = 5; i >= 1; i--) {
    const alpha = (10 + pulse * 14 + cornerGlow * 28) / i;
    g.fill(170, 255, 0, alpha);
    g.circle(cx, cy, FACE + i * bloom * 0.45);
  }

  const ctx = g.drawingContext;
  ctx.save();
  ctx.shadowBlur = bloom;
  ctx.shadowColor = `rgba(170, 255, 0, ${0.75 + cornerGlow * 0.25})`;
  g.fill(170, 255, 0);
  g.circle(cx, cy, FACE);
  ctx.restore();

  g.fill(0);
  g.beginShape();
  for (const [u, v] of GLASS) g.vertex(cx + u * (FACE / 2), cy + v * (FACE / 2));
  g.endShape(CLOSE);
}
