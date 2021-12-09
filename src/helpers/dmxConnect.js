// import { io } from 'socket.io';

class DMXConnect {
  constructor () {
    this.baselURL = '/api';

    this.throttleTime = 500;
    this.requestTime = 0;

    this.currentBPM = 60;
    //this.lastBPMCountTime = 0;
    this.bpmInterval = 0;

    this.flashRate = 0;


    this.sender = null;

    this.stepSequencer = [ false, false, false, false, false, false, false, false ];

  }

  getBPM () {
    return this.currentBPM;
  }

  setFlashRate (rate) {
    this.currentBPM = rate;
    this.sendRequest();
  }

  setStepSequencer (stepIndex, stepValue) {
    this.stepSequencer[stepIndex] = stepValue;
    this.sendRequest();
  }

  getStepSequencer () {
    return this.stepSequencer;
  }

  sendRequest () {
    // throttling...
    //const requestTimeNow = Date.now();
    // if (this.requestTime === 0 || this.requestTime + this.throttleTime < requestTimeNow) {
      console.log(this.getBPM());
      console.log(this.getStepSequencer());

      (async () => {
        // this.requestTime = Date.now();
        const rawResponse = await fetch(this.baselURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            currentBPM: this.getBPM(),
            steps: this.getStepSequencer()
          })
        });
        const content = await rawResponse.json();
      })();
  }

  sendPlayRequest () {
    (async () => {
      const rawResponse = await fetch(this.baselURL + '/start', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isRunning: true
        })
      });
      const content = await rawResponse.json();
    })();
  }
}

export default DMXConnect;