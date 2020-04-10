'use babel'

// from https://p5js.org/examples/interaction-wavemaker.html

export default function(p) {

  let t = 0;

  p.setup = () => {
    p.noStroke();
  }

  p.draw = () => {
    p.background(10, 10); // translucent background (creates trails)

    p.fill(120, 200, (t*100) % 255);

    // make a x and y grid of ellipses
    for (let x = 0; x <= p.width; x = x + 30) {
      for (let y = 0; y <= p.height; y = y + 30) {
        // starting point of each circle depends on mouse position
        const xAngle = p.map(p.mouseX, 0, p.width, -4 * p.PI, 4 * p.PI, true);
        const yAngle = p.map(p.mouseY, 0, p.height, -4 * p.PI, 4 * p.PI, true);
        // and also varies based on the particle's location
        const angle = xAngle * (x / p.width) + yAngle * (y / p.height);

        // each particle moves in a circle
        const myX = x + 20 * p.cos(2 * p.PI * t + angle);
        const myY = y + 20 * p.sin(2 * p.PI * t + angle);

        p.ellipse(myX, myY, 10); // draw particle
      }
    }

    t = t + 0.01; // update time
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

}
