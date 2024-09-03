import React from 'react';
import Plantpic from './plant_component.js';
import LiquidGaugeComponent from './LiquidGauge';
import plantPicture1 from './plantPicture1.png';
import plantPicture2 from './plantPicture2.png';
import plantPicture3 from './plantPicture3.png';
import SliderWithValue from './millilitre_scale_component.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>the remote watering app</h2>
      <ul>
        <li>
          <div className="components-container">
            <SliderWithValue />
            <Plantpic image={plantPicture1} />
            <LiquidGaugeComponent />
          </div>
        </li>
        <li>
          <div className="components-container">
            <SliderWithValue />
            <Plantpic image={plantPicture2} />
            <LiquidGaugeComponent />
          </div>
        </li>
        <li>
          <div className="components-container">
            <SliderWithValue />
            <Plantpic image={plantPicture3} />
            <LiquidGaugeComponent />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
