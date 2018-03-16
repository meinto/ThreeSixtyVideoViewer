import Hammer from 'hammerjs';

class ThreeSixtyVideoViewer {
  constructor(settings) {
    const {
      selector = '#video', boost = 6, frameRate = 25, pixelToFrame = 10,
    } = settings;

    this.video = document.querySelector(selector); // eslint-disable-line
    this.hammer = new Hammer(this.video);

    let lastStep = 0;
    let step = 0;

    this.hammer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 10 }));

    this.hammer.on('pan', (ev) => {
      step = Math.floor(ev.deltaX / pixelToFrame);
    });

    this.hammer.on('panleft', (ev) => {
      if (step !== lastStep && !this.video.seeking) {
        this.video.currentTime -= (1 + -ev.velocityX * boost) / frameRate; // eslint-disable-line
        lastStep = step;
        if (this.video.currentTime === 0) {
          this.video.currentTime = this.video.duration;
        }
      }
    });

    this.hammer.on('panright', (ev) => {
      if (step !== lastStep && !this.video.seeking) {
        this.video.currentTime += (1 + ev.velocityX * boost) / frameRate; // eslint-disable-line
        lastStep = step;
        if (this.video.duration === this.video.currentTime) {
          this.video.currentTime = 0;
        }
      }
    });
  }
}

module.exports = settings => new ThreeSixtyVideoViewer(settings);
