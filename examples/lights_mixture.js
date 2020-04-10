'use babel'

// from https://p5js.org/examples/lights-mixture.html

export default function(p) {

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowWidth, p.WEBGL);
    p.noStroke();
  }

  p.draw = () => {
    p.background(0);

    // Orange point light on the right
    p.pointLight(50, 100, 0, 500, 0, 200);

    // Blue directional light from the left
    p.directionalLight(0, 102, 255, -1, 0, 0);

    // Yellow spotlight from the front
    p.pointLight(255, 255, 109, 0, 0, 300);

    p.rotateY(p.map(p.mouseX, 0, p.width, 0, p.PI));
    p.rotateX(p.map(p.mouseY, 0, p.height, 0, p.PI));
    p.box(200);
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

}
