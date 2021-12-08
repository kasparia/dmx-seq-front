import logo from './logo.svg';
import './App.css';
import DMXConnect from './helpers/dmxConnect';

function App() {

  const connector = new DMXConnect();
  connector.setFlashRate(255);

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <input
            type='range'
            min='10'
            max='1000'
            defaultValue='250'
            classNmae='slider'
            id='rateSlider'
            onChange={ (event) => connector.setFlashRate(event.target.value) }  
          />
        </div>
      </header>
    </div>
  );
}

export default App;
