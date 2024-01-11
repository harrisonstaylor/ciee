// HintButton.js
import React from 'react';
import "../App.css";

function HintButton({ id, text, onClick, dateCreated, status, urgency }) {
    const buttonData = {
        id,  // Include the id in the buttonData
        text,
        dateCreated,
        status,
        urgency,
    };

    return (
        <button onClick={() => onClick(buttonData)} className={"tile"}>
            {text}
        </button>
    );
}

export default HintButton;
