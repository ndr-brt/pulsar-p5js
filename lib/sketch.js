'use babel'

export default class Sketch {

  constructor() {
  }

  handle(p) {

    let y = 100;

    p.setup = (() => {
      p.frameRate(60)
    })

    p.draw = (() => {
      p.background(250-y, 2+y, 34+(y/3));

      // let spectrum = fft.analyze();
      //
      // p.beginShape();
      // for (i = 0; i < spectrum.length; i++) {
      //   p.vertex(i, map(spectrum[i], 0, 255, height, 0));
      // }
      // p.endShape();

      p.noStroke();

      p.fill(254, 5-y, 2);
      p.triangle(18, 18, 18, 860, 81, 360);

      p.fill(102);
      p.rect(81, 81, y*4, 240+y);

      p.fill(204);
      p.quad(189, 18, 216, 18, 216, 360, 144, 360);

      p.fill(255);
      p.ellipse(252, 844, 72, 72);

      p.fill(2, 23+y, 2);
      p.triangle(28, 18+(y*5), 1351-(y*2), 360, 188, 1360);

      p.fill(255);
      p.arc(479, 300, 280, 280, 3.14, 7.28);

      p.stroke(255);
      y = y + 1;
      if (y > 800) {
        y = 0;
      }
      p.line(20, y, window.innerWidth, y);
    })
  }
}
