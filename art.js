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

function drawArt(g) {
  g.background(0);

  const cx = g.width / 2;
  const cy = g.height / 2;
  const r = Math.min(g.width, g.height) * 0.4;
  const spot = (deg) => {
    const a = (deg * Math.PI) / 180;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const topJoin = spot(285);
  const sideJoin = spot(208);
  const tip = [cx - r * 1.55, cy - r * 1.28];

  g.noStroke();
  g.fill(255, 176, 0);
  g.circle(cx, cy, r * 2);
  g.triangle(tip[0], tip[1], topJoin[0], topJoin[1], sideJoin[0], sideJoin[1]);

  g.fill(255);
  g.beginShape();
  for (const [x, y] of [[-0.62, -0.26], [-0.28, -0.16], [-0.14, -0.02], [-0.24, 0.12], [-0.46, 0.16], [-0.62, 0.02]]) {
    g.vertex(cx + x * r, cy + y * r);
  }
  g.endShape(CLOSE);
  g.beginShape();
  for (const [x, y] of [[0.62, -0.26], [0.28, -0.16], [0.14, -0.02], [0.24, 0.12], [0.46, 0.16], [0.62, 0.02]]) {
    g.vertex(cx + x * r, cy + y * r);
  }
  g.endShape(CLOSE);
  g.ellipse(cx, cy + r * 0.08, r * 0.16, r * 0.07);

  g.noFill();
  g.stroke(255);
  g.strokeWeight(r * 0.025);
  g.strokeJoin(ROUND);
  g.beginShape();
  for (const [x, y] of [[-0.50, 0.34], [-0.34, 0.20], [-0.18, 0.46], [0, 0.18], [0.18, 0.46], [0.34, 0.20], [0.50, 0.34]]) {
    g.vertex(cx + x * r, cy + y * r);
  }
  g.endShape();
  g.line(cx - r * 0.40, cy + r * 0.16, cx - r * 0.28, cy + r * 0.32);
  g.line(cx + r * 0.40, cy + r * 0.16, cx + r * 0.28, cy + r * 0.32);

  g.stroke(0);
  g.strokeWeight(r * 0.055);
  g.strokeCap(ROUND);
  g.noFill();
  g.arc(cx, cy, r * 2, r * 2, (285 * Math.PI) / 180, (208 * Math.PI) / 180 + Math.PI * 2);
  g.line(topJoin[0], topJoin[1], tip[0], tip[1]);
  g.line(tip[0], tip[1], sideJoin[0], sideJoin[1]);
  g.line(sideJoin[0], sideJoin[1], sideJoin[0] + r * 0.34, sideJoin[1] + r * 0.28);
}
