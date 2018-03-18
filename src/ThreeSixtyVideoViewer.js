import Hammer from 'hammerjs';

class ThreeSixtyVideoViewer {
  constructor(settings) {
    this.settings = {
      selector: '#video',
      boost: 6,
      frameRate: 25,
      pixelToFrame: 10,
      ...settings,
    };

    this.video = document.querySelector(this.settings.selector);
    this.hammer = new Hammer(this.video);

    this.lastStep = 0;
    this.step = 0;

    this.hammer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 10 }));

    this.hammer.on('pan', this.pan);
    this.hammer.on('panleft', this.panleft);
    this.hammer.on('panright', this.panright);
  }

  pan = (ev) => {
    this.step = Math.floor(ev.deltaX / this.settings.pixelToFrame);
  }

  panleft = (ev) => {
    const { boost, frameRate } = this.settings;
    if (this.step !== this.lastStep && !this.video.seeking) {
      this.video.currentTime -= (1 + -ev.velocityX * boost) / frameRate; // eslint-disable-line
      this.lastStep = this.step;
      if (this.video.currentTime === 0) {
        this.video.currentTime = this.video.duration;
      }
    }
  }

  panright = (ev) => {
    const { boost, frameRate } = this.settings;
    if (this.step !== this.lastStep && !this.video.seeking) {
      this.video.currentTime += (1 + ev.velocityX * boost) / frameRate; // eslint-disable-line
      this.lastStep = this.step;
      if (this.video.duration === this.video.currentTime) {
        this.video.currentTime = 0;
      }
    }
  }
}

module.exports = settings => new ThreeSixtyVideoViewer(settings);
