'use babel'

// from https://p5js.org/examples/structure-coordinates.html

export default class {

  handle(p) {

    let y = 100;

    p.setup = () => { }

    p.draw = () => {
      p.background(0);
      p.noFill();

      p.stroke(255);
      p.point(p.windowWidth * 0.5, p.windowHeight * 0.5);
      p.point(p.windowWidth * 0.5, p.windowHeight * 0.25);

      p.stroke(0, 153, 255);
      p.line(0, p.windowHeight * 0.33, p.windowWidth, p.windowHeight * 0.33);

      p.stroke(255, 153, 0);
      p.rect(p.windowWidth * 0.25, p.windowHeight * 0.1, p.windowWidth * 0.5, p.windowHeight * 0.8);
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
  }
}
