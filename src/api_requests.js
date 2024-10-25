import React from "react"

async function sendPumpCommandPOST(pumpNumber, millisecondsOn) {

    const data = {
        pumpNumber: pumpNumber,
        timeThatPumpIsOn: millisecondsOn
    }
    try {
        const APIEndpoint = "https://smashing-correct-sponge.ngrok-free.app/api/turn-pump-on-off"    
        const response = await fetch(APIEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error("POST request didn't work.. pump didn't turn on!")
        }

        const result = await response.json()
        return result

    } catch(error) {
        console.error(`fetch operation didn't work, pump wasn't turned on:`, error)
    }
}

export default sendPumpCommandPOST

