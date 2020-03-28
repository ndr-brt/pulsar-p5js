'use babel'

export default class Sketch {
  constructor() {
  }

  handle(p) {
    console.log("Change me! i'm good")
    let y = 100;

    p.setup = (() => {
      p.frameRate(60)
    })

    p.draw = (() => {
      p.background(12);
      p.noStroke();

      p.fill(204);
      p.triangle(18, 18, 18, 360, 81, 360);

      p.fill(102);
      p.rect(81, 81, 63, 63);

      p.fill(204);
      p.quad(189, 18, 216, 18, 216, 360, 144, 360);

      p.fill(255);
      p.ellipse(252, 844, 72, 72);

      p.fill(204);
      p.triangle(288, 18, 351, 360, 288, 360);

      p.fill(255);
      p.arc(479, 300, 280, 280, 3.14, 7.28);

      p.stroke(255);
      y = y - 1;
      if (y < 0) {
        y = 600;
      }
      p.line(0, y, 100, y);
    })
  }
}
