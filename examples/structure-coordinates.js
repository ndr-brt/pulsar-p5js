'use babel'

// from https://p5js.org/examples/structure-coordinates.html

export default function(p) {

  p.setup = () => { }

  p.draw = () => {
    p.background(0);
    p.noFill();

    p.stroke(255);
    p.point(p.width * 0.5, p.height * 0.5);
    p.point(p.width * 0.5, p.height * 0.25);

    p.stroke(0, 153, 255);
    p.line(0, p.height * 0.33, p.width, p.height * 0.33);

    p.stroke(255, 153, 0);
    p.rect(p.width * 0.25, p.height * 0.1, p.width * 0.5, p.height * 0.8);
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

}
