import React from 'react';
import Plantpic from './plant_component.js';
import VerticalScale from './millilitre_scale_component.js';
import LiquidGaugeComponent from './LiquidGauge';
import plantPicture1 from './plantPicture1.png';
import plantPicture2 from './plantPicture2.png';
import plantPicture3 from './plantPicture3.png';
import './App.css';
import SliderWithValue from './testing.js';

function App() {
  return (
    <div className="App">
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
 
