import React from "react";
import ButtonGroup from "./ButtonGroup";
import "../styles/ImageGrid.css"

const ImageGrid = ({ title, songs , buttonHandler}) => {
    const buttons = [
        { label: "short term" },
        { label: "medium term" },
        { label: "long term" },
    ];

    function handleButtonClick(button) {
        buttonHandler(button)
    }
    
    return (
        <div>
            <h5 className="grid-view-title">{title}</h5>
            <div className="button">
                <ButtonGroup buttons={buttons} onButtonClick={handleButtonClick} />
            </div>
            <div className="image-grid">
            {songs.map((song, index) => (
                <div className="image" key={index}>
                    <img src={song.album.images[1].url} alt={song.album.images[1].url} />
                    <div className="image-text">{song.name.toLowerCase()}</div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default ImageGrid;