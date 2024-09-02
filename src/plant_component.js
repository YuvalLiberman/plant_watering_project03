import React from "react"

function Plantpic(prop) {
    
    return (
        <div className="plant-picture">
            <img src={prop.image} width="200" height="260" alt="Plant"/>
        </div>
    )
}

export default Plantpic; 