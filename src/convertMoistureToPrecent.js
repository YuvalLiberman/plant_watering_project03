
// this function parameters can be changed to get the most accurate precentage representation

const convertMoistureValue = (sensorValue) => {
    const minSensorValue = 300 // eqauls 100% moisture precent for calculation
    const maxSensorValue = 700 // equals 0% moisture precent for calculation

    // convetion method:
    const percentage = ((maxSensorValue - sensorValue) / (maxSensorValue - minSensorValue)) * 100

    // make sure percentage is between 0 - 100 and round it
    return Math.max(0, Math.min(Math.round(percentage), 100))
}

export default convertMoistureValue