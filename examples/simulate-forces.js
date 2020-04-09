'use babel'

// from https://p5js.org/examples/simulate-forces.html
const p5 = require('p5')

export default function(p) {

  let movers = [];
  let liquid;

  p.setup = () => {
    reset();
    liquid = new Liquid(0, p.windowHeight / 2, p.windowWidth, p.windowHeight / 2, 0.1);
  }

  p.draw = () => {
    p.background(127);

    // Draw water
    liquid.display();

    for (let i = 0; i < movers.length; i++) {

      // Is the Mover in the liquid?
      if (liquid.contains(movers[i])) {
        // Calculate drag force
        let dragForce = liquid.calculateDrag(movers[i]);
        // Apply drag force to Mover
        movers[i].applyForce(dragForce);
      }

      // Gravity is scaled by mass here!
      let gravity = p.createVector(0, 0.1 * movers[i].mass);
      // Apply gravity
      movers[i].applyForce(gravity);

      // Update and display
      movers[i].update();
      movers[i].display();
      movers[i].checkEdges();
    }

  }

  p.mousePressed = () => {
    reset()
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  function reset() {
    let moversCount = 9
    for (let i = 0; i < moversCount; i++) {
      movers[i] = new Mover(p.random(0.5, 5), i * (p.windowWidth / moversCount) + 25, 0);
    }
  }

  let Liquid = function(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  };

  Liquid.prototype.contains = function(m) {
    let l = m.position;
    return l.x > this.x && l.x < this.x + this.w &&
           l.y > this.y && l.y < this.y + this.h;
  };

  // Calculate drag force
  Liquid.prototype.calculateDrag = function(m) {
    // Magnitude is coefficient * speed squared
    let speed = m.velocity.mag();
    let dragMagnitude = this.c * speed * speed;

    // Direction is inverse of velocity
    let dragForce = m.velocity.copy();
    dragForce.mult(-1);

    // Scale according to magnitude
    // dragForce.setMag(dragMagnitude);
    dragForce.normalize();
    dragForce.mult(dragMagnitude);
    return dragForce;
  };

  Liquid.prototype.display = function() {
    p.noStroke();
    p.fill(50);
    p.rect(this.x, this.y, this.w, this.h);
  };

  function Mover(m, x, y) {
    this.mass = m;
    this.position = p.createVector(x, y);
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
  }

  // Newton's 2nd law: F = M * A
  // or A = F / M
  Mover.prototype.applyForce = function(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };

  Mover.prototype.update = function() {
    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration);
    // position changes by velocity
    this.position.add(this.velocity);
    // We must clear acceleration each frame
    this.acceleration.mult(0);
  };

  Mover.prototype.display = function() {
    p.stroke(0);
    p.strokeWeight(2);
    p.fill(255,127);
    p.ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  };

  // Bounce off bottom of window
  Mover.prototype.checkEdges = function() {
    if (this.position.y > (p.height - this.mass * 8)) {
      // A little dampening when hitting the bottom
      this.velocity.y *= -0.9;
      this.position.y = (p.height - this.mass * 8);
    }
  };

}
