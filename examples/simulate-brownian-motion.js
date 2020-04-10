'use babel'

// from https://p5js.org/examples/simulate-brownian-motion.html

export default function(p) {

  let num = 2000;
  let range = 6;

  let ax = [];
  let ay = [];

  p.setup = () => {
    for ( let i = 0; i < num; i++ ) {
      ax[i] = p.windowWidth / 2;
      ay[i] = p.windowHeight / 2;
    }
    p.frameRate(30);
  }

  p.draw = () => {
    p.background(51);

    for (let i = 1; i < num; i++) {
      ax[i - 1] = ax[i];
      ay[i - 1] = ay[i];
    }

    ax[num - 1] += p.random(-range, range);
    ay[num - 1] += p.random(-range, range);

    ax[num - 1] = p.constrain(ax[num - 1], 0, p.windowWidth);
    ay[num - 1] = p.constrain(ay[num - 1], 0, p.windowHeight);

    for (let j = 1; j < num; j++ ) {
      let val = j / num * 204.0 + 51;
      p.stroke(val);
      p.line(ax[j - 1], ay[j - 1], ax[j], ay[j]);
    }

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

}
