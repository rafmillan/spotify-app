import React from "react";
import { useEffect, useState } from "react";
import "../styles/tailwind.css";

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
        <div className="grid grid-cols-3 gap-2 max-w-full pt-1 py-2 lg:pt-6">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={
                        index === activeButton ? 
                        "text-xs bg-b-dpink text-white font-bold py-2.5 mx-0 rounded-full" 
                        : "text-xs bg-b-lpink hover:bg-b-pink active:bg-b-dpink text-white font-bold py-2 mx-0 rounded-full"}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
}


