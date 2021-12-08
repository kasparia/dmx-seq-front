class DMXConnect {
  constructor () {
    this.baselURL = '/api';
    this.flashRateURL = '?flashRate=';

    this.throttleTime = 500;
    this.requestTime = 0;
  }

  setFlashRate (rate) {
    console.log(rate);
    this.sendRequest({
      flashRate: rate
    });
  }

  sendRequest (requestBody) {
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
          body: JSON.stringify(requestBody)
        });
        const content = await rawResponse.json();
      
        console.log(content);
      })();
    }
  // }
}

export default DMXConnect;