import logo from './logo.svg';
import './App.css';
import DMXConnect from './helpers/dmxConnect';
import styled from 'styled-components';

const StepGrid = styled.div`
  & {
    display: flex;
    margin: 20px 0;
  }

  input {
    margin: 0 10px;
    box-shadow: 0px 8px #ffffcc;
  }

  input[type="checkbox"]:selected {
    box-shadow: 0px 8px #00ffcc;
  }
`;

function App() {

  const connector = new DMXConnect();
  //connector.setFlashRate(255);

  const setStep = (event) => {
    const index = parseInt(event.target.id.slice(-1)) - 1;
    console.log(index);
    const value = event.target.checked;
    connector.setStepSequencer(index, value);
    
    // console.log(event.target.checked);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <span>{ connector.getBPM() }</span>
          <input
            type='range'
            min='10'
            max='150'
            defaultValue='60'
            classNmae='slider'
            id='rateSlider'
            onChange={ (event) => connector.setFlashRate(event.target.value) }  
          />
        </div>
        <button onClick={ () => connector.sendPlayRequest() }>PLAY</button>

        <StepGrid>
          <input type='checkbox' id='step_1' name='step_1' onChange={ (event) => setStep(event) } />
          <input type='checkbox' id='step_2' name='step_2' onChange={ (event) => setStep(event) } />
          <input type='checkbox' id='step_3' name='step_3' onChange={ (event) => setStep(event) } />
          <input type='checkbox' id='step_4' name='step_4' onChange={ (event) => setStep(event) } />
          <input type='checkbox' id='step_5' name='step_5' onChange={ (event) => setStep(event) } />
          <input type='checkbox' id='step_6' name='step_6' onChange={ (event) => setStep(event) } />
          <input type='checkbox' id='step_7' name='step_7' onChange={ (event) => setStep(event) } />
          <input type='checkbox' id='step_8' name='step_8' onChange={ (event) => setStep(event) } />
        </StepGrid>
      </header>
    </div>
  );
}

export default App;
