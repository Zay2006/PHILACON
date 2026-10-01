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
  const cy = g.height * 0.56;
  const r = Math.min(g.width, g.height) * 0.34;
  const spot = (deg) => {
    const a = (deg * Math.PI) / 180;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const sideJoin = spot(206);
  const crown = spot(308);
  const tip = [cx - r * 1.62, cy - r * 1.02];

  // One outline around the circle and the point, so the rim does not cut through the spike.
  g.fill(255, 176, 0);
  g.stroke(0, 0, 0);
  g.strokeWeight(r * 0.065);
  g.strokeCap(ROUND);
  g.strokeJoin(ROUND);
  g.beginShape();
  for (let deg = 308; deg <= 206 + 360; deg += 3) {
    const p = spot(deg % 360);
    g.vertex(p[0], p[1]);
  }
  g.vertex(tip[0], tip[1]);
  g.quadraticVertex(cx - r * 0.1, cy - r * 1.05, crown[0], crown[1]);
  g.endShape(CLOSE);

  angryEye(g, cx - r * 0.34, cy - r * 0.04, r, -1);
  angryEye(g, cx + r * 0.34, cy - r * 0.04, r, 1);

  g.noStroke();
  g.fill(255);
  g.ellipse(cx, cy + r * 0.12, r * 0.15, r * 0.07);

  g.noFill();
  g.stroke(255);
  g.strokeWeight(r * 0.028);
  g.strokeJoin(ROUND);
  g.beginShape();
  for (const [x, y] of [[-0.48, 0.58], [-0.32, 0.42], [-0.16, 0.70], [0, 0.38], [0.16, 0.70], [0.32, 0.42], [0.48, 0.58]]) {
    g.vertex(cx + x * r, cy + y * r);
  }
  g.endShape();
  g.strokeWeight(r * 0.02);
  g.line(cx - r * 0.46, cy + r * 0.16, cx - r * 0.32, cy + r * 0.30);
  g.line(cx + r * 0.46, cy + r * 0.16, cx + r * 0.32, cy + r * 0.30);

  g.stroke(0, 0, 0);
  g.strokeWeight(r * 0.045);
  g.line(sideJoin[0], sideJoin[1], sideJoin[0] + r * 0.38, sideJoin[1] + r * 0.16);
}

// dir is -1 for the left eye and 1 for the right, so the outer corner sits higher.
function angryEye(g, x, y, r, dir) {
  g.push();
  g.translate(x, y);
  g.scale(dir, 1);
  g.noStroke();
  g.fill(255);
  g.beginShape();
  g.vertex(0.30 * r, -0.10 * r);
  g.vertex(-0.02 * r, 0.00 * r);
  g.vertex(-0.10 * r, 0.10 * r);
  g.bezierVertex(0.00 * r, 0.20 * r, 0.22 * r, 0.16 * r, 0.32 * r, 0.02 * r);
  g.endShape(CLOSE);
  g.pop();
}
