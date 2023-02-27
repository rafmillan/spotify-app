import React from "react";
import { useEffect, useState } from "react";
import "../styles/ButtonGroup.css";

export default function ButtonGroup(props) {
    ButtonGroup.defaultProps = {
        onButtonClick: () => { },
    };
    const { buttons, onButtonClick } = props;
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (index) => {
        setActiveButton(index)
        onButtonClick(index);
    }

    useEffect(() => {
        if (activeButton === null){
            setActiveButton(0)
        }
    }, [activeButton])

    return (
        <div className="button-group">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={index === activeButton ? "current" : ""}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
}


