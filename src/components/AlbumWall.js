import React from "react";
import "../styles/tailwind.css"

const AlbumWall = ({ songs }) => {
    return (
        <div className="grid grid-cols-3 gap-2 max-w-50">
            {songs.map((song, index) => (
                <div className="relative rounded-md" key={index}>
                    <img
                        className="w-full rounded-md aspect-square"
                        src={song.album.images[1].url}
                        alt={song.album.images[1].url}
                    />
                    {/* <div className="opacity-100 hover:opacity-100 -translate-y-">{song.name.toLowerCase()}</div> */}
                    <div className="flex items-center justify-center rounded-md absolute opacity-0 top-0 w-full h-full text-bone hover:opacity-100 back hover:backdrop-blur-[2px] bg-bg-gray backdrop-blur-lg bg-opacity-70">
                        <p className="px-2 font-semibold text-center text-3xl lg:text-4xl">
                            {song.name.toLowerCase()}
                        </p>
                    </div>                        
                </div>
            ))}
        </div>
    );
};

export default AlbumWall;