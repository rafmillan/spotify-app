import React from "react";
import {useEffect, useState} from "react"

export default function ButtonGroup(props) {
    ButtonGroup.defaultProps = {
        onButtonClick: () => {},
    }
    const { buttons, onButtonClick } = props;
    
    const [lastClickedButtonIndex, setLastClickedButtonIndex] = useState(null);

    function handleClick(buttonIndex) {
        onButtonClick(buttonIndex);
        setLastClickedButtonIndex(buttonIndex);
    }

    return (
        <div className="button-group">
        {buttons.map((button, index) => (
            <button key={index} onClick={() => handleClick(index)}
            className={lastClickedButtonIndex === index ? "active" : ""}>
                {button.label}
            </button>
        ))}
        </div>
    );
}