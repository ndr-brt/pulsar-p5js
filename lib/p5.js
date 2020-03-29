'use babel';

import p5lib from 'p5'
// import "p5/lib/addons/p5.sound";

export default class P5 extends p5lib {

  running: false

  constructor(sketch) {
    super(sketch)
    this.createCanvas(window.innerWidth, window.innerHeight)
    this.mode = 'P2D'
    this.canvas.style.position = "absolute"
    this.canvas.style.top = "0px"
    this.canvas.style.left = "0px"
    this.canvas.style.zIndex = -1
  }

  start() {
    this.element = document.createElement('div')
    this.element.classList.add('p5js')
    this.canvas = document.createElement('canvas')
    document.body.classList.add('p5js-enabled')
    this.element.appendChild(this.canvas)
    console.log('Start P5js')
    this.running = true
  }

  stop() {
    console.log("Stop P5js")
    this.element.remove()
    document.body.classList.remove('p5js-enabled')
    this.running = false
  }

  isRunning() {
    return this.running;
  }
}
