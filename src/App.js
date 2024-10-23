import React, { useState, useEffect } from 'react'
import Plantpic from './plant_component.js'
import LiquidGaugeComponent from './LiquidGauge'
import convertMoistureValue from './convertMoistureToPrecent.js'
import plantPicture1 from './plantPicture1.png'
import plantPicture2 from './plantPicture2.png'
import plantPicture3 from './plantPicture3.png'
import SliderWithValue from './millilitre_scale_component.js'
import './App.css'

function App() {
  const [plantMoisturePercentages, updateMoistureValues] = useState([0, 0, 0])

  const gettingMoisturePercentageData = async () => {
    try {
      const response = await fetch("https://smashing-correct-sponge.ngrok-free.app/api/get-valid-line")
      if (!response.ok) {
        throw new Error("Network response is not what we wanted, something's wrong")
      }
      
      const sensorData = await response.json()
      const formattedSensorData = sensorData.valid_line.split(',').map(Number)
      const moisturePrecent = formattedSensorData.map(convertMoistureValue)
      updateMoistureValues(moisturePrecent)
    } catch (error) {
      console.error("Error getting the sensor data:", error)
    }
  }

  useEffect(() => {
    gettingMoisturePercentageData()
    const interval = setInterval(gettingMoisturePercentageData, 2000)
    return () => clearInterval(interval) // Cleanup
  }, [])

  return (
    <div className="App">
      <h2>the remote watering app</h2>
      <ul>
        <li>
          <div className="components-container">
            <SliderWithValue />
            <Plantpic image={plantPicture1} />
            <LiquidGaugeComponent moistureValue={plantMoisturePercentages[0]} />
          </div>
        </li>
        <li>
          <div className="components-container">
            <SliderWithValue />
            <Plantpic image={plantPicture2} />
            <LiquidGaugeComponent moistureValue={plantMoisturePercentages[1]} />
          </div>
        </li>
        <li>
          <div className="components-container">
            <SliderWithValue />
            <Plantpic image={plantPicture3} />
            <LiquidGaugeComponent moistureValue={plantMoisturePercentages[2]} />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App
