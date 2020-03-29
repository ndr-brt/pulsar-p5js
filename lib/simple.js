y = 100;

function setup () {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(60)
}

function draw () {
  background(250-y, 2+y, 34+(y/3));

  // let spectrum = fft.analyze();
  //
  // beginShape();
  // for (i = 0; i < spectrum.length; i++) {
  //   vertex(i, map(spectrum[i], 0, 255, height, 0));
  // }
  // endShape();

  noStroke();

  fill(254, 5-y, 2);
  triangle(18, 18, 18, 860, 81, 360);

  fill(102);
  rect(81, 81, y*4, 240+y);

  fill(204);
  quad(189, 18, 216, 18, 216, 360, 144, 360);

  fill(255);
  ellipse(252, 844, 72, 72);

  fill(2, 23+y, 2);
  triangle(28, 18+(y*5), 1351-(y*2), 360, 188, 1360);

  fill(255);
  arc(479, 300, 280, 280, 3.14, 7.28);

  stroke(255);
  y = y + 1;
  if (y > 800) {
    y = 0;
  }
  line(20, y, 800, y);
}
