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

// Sharp letters for the wordmark. Each letter is a list of shapes.
// Points are in a 0–100 box: x to the right, y down. Negative x sticks out to the left.
const WORD = [
  [118, [
    [[-78, -6], [96, 2], [104, 24], [34, 28], [6, 4]],
    [[-22, 42], [78, 38], [76, 56], [-4, 62]],
    [[10, 72], [98, 66], [88, 100], [6, 98]],
    [[54, 8], [84, 6], [76, 100], [48, 98]],
  ]],
  [108, [
    [[0, 8], [30, 0], [48, 64], [66, 0], [100, 10], [52, 100]],
  ]],
  [108, [
    [[6, 100], [34, 6], [52, 0], [36, 100]],
    [[46, 0], [64, 8], [100, 100], [72, 100]],
    [[30, 54], [76, 48], [72, 66], [32, 70]],
  ]],
  [108, [
    [[4, 4], [28, 0], [32, 100], [8, 100]],
    [[68, 0], [94, 6], [88, 100], [62, 98]],
    [[20, 6], [40, 2], [82, 98], [60, 100]],
  ]],
  [112, [
    [[78, 6], [28, 0], [6, 22], [4, 78], [28, 100], [82, 94], [92, 74], [46, 70], [48, 52], [100, 46], [96, 20]],
  ]],
  [108, [
    [[-16, 4], [92, 6], [98, 26], [34, 30], [8, 10]],
    [[-4, 44], [74, 40], [72, 56], [6, 60]],
    [[10, 72], [94, 68], [84, 100], [8, 98]],
    [[50, 12], [80, 8], [72, 100], [44, 98]],
  ]],
  [86, [
    [[16, 0], [42, 4], [34, 70], [92, 74], [82, 100], [6, 96]],
  ]],
  [48, [
    [[8, 0], [40, 6], [30, 100], [0, 92]],
  ]],
  [108, [
    [
      [[50, 0], [92, 16], [100, 50], [88, 86], [50, 100], [8, 84], [0, 48], [14, 14]],
      [[50, 22], [74, 32], [78, 52], [70, 74], [50, 80], [28, 70], [24, 48], [34, 28]],
    ],
  ]],
  [120, [
    [[4, 4], [28, 0], [32, 100], [8, 100]],
    [[18, 8], [40, 2], [78, 96], [56, 100]],
    [[58, 6], [168, -16], [184, -2], [86, 100], [62, 98]],
  ]],
];

function drawArt(g) {
  g.background(0);

  const gap = 8;
  const padL = 100;
  const padR = 120;
  const units = WORD.reduce((sum, [w]) => sum + w, 0) + gap * (WORD.length - 1) + padL + padR;
  const scale = (g.width * 0.94) / units;
  const em = 150 * scale;
  const shear = 0.1;
  const top = (g.height - em) / 2;
  let x = (g.width - units * scale) / 2 + padL * scale;

  for (const [w, shapes] of WORD) {
    const width = w * scale;
    for (const shape of shapes) {
      const contours = typeof shape[0][0] === 'number' ? [shape] : shape;
      const mapped = contours.map((contour) => contour.map(([px, py]) => [
        x + (px / 100) * width + ((100 - py) / 100) * em * shear,
        top + (py / 100) * em,
      ]));
      paintGlyph(g, mapped, top - em * 0.25, top + em * 1.05);
    }
    x += width + gap * scale;
  }
}

// Yellow at the top of the letters, red at the bottom.
function paintGlyph(g, contours, top, bottom) {
  const ctx = g.drawingContext;
  ctx.save();
  ctx.beginPath();
  for (const pts of contours) {
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
  }
  const grad = ctx.createLinearGradient(0, top, 0, bottom);
  grad.addColorStop(0, '#ffe84a');
  grad.addColorStop(0.4, '#ff9a00');
  grad.addColorStop(0.72, '#ff4a00');
  grad.addColorStop(1, '#d40000');
  ctx.fillStyle = grad;
  ctx.fill('evenodd');
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(90, 16, 0, 0.55)';
  ctx.lineJoin = 'miter';
  ctx.stroke();
  ctx.restore();
}
