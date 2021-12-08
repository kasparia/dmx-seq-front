// import { io } from 'socket.io';

class DMXConnect {
  constructor () {
    this.baselURL = '/api';
    this.flashRateURL = '?flashRate=';

    this.throttleTime = 500;
    this.requestTime = 0;

    this.currentBPM = 60;
    //this.lastBPMCountTime = 0;
    this.bpmInterval = 0;

    this.flashRate = 0;


    this.sender = null;

    this.stepSequencer = [
      false,
      false,
      false,
      false
    ];

  }

  setFlashRate (rate) {
    this.flashRate = rate;
    this.sendRequest();
  }

  setStepSequencer (stepIndex, stepValue) {
    this.stepSequencer[stepIndex] = stepValue;
    this.sendRequest();
  }

  getStepSequencer () {
    return this.stepSequencer;
  }

  sendRequest (rate) {
    const requestTimeNow = Date.now();
    
    // if (this.requestTime === 0 || this.requestTime + this.throttleTime < requestTimeNow) {
      (async () => {
        this.requestTime = Date.now();
        console.log(this.requestTime);
        const rawResponse = await fetch(this.baselURL + this.flashRateURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            currentBPM: this.currentBPM,
            steps: this.getStepSequencer()
          })
        });
        const content = await rawResponse.json();
      
        console.log(content);
      })();
  }
}

export default DMXConnect;