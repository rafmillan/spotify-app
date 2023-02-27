import React from "react"
import ButtonGroup from "./ButtonGroup";
import "../style.css"

export default function ListView({title, list, image, buttonHandler}) {
    const buttons = [
        { label: "short term" },
        { label: "medium term" },
        { label: "long term" },
    ];

    function handleButtonClick(index) {
        buttonHandler(index)
    }

	return (
		<nav>
            <div>
                <h5 className="list-view-title">{title}</h5>
                <ButtonGroup buttons={buttons} onButtonClick={handleButtonClick} />
                <ol className="top-list">
                    {list.map((value, index) => {
                        return <li className="top-list" key={index}>{value.name}</li>;
                    })}
                </ol>
            </div>
            <img className="list-view-image" src={image} alt="new"/>
        </nav>
	)
}