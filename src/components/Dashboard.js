import React, { useEffect, useState } from "react";
import ListView from "./TopList";
import ImageGrid from "./ImageGrid";
import "../styles/Dashboard.css";

import { fetchTopSongs, fetchUser, fetchTopArtists} from "../Api";

const artistCount = 10;
const songCount = 12;
const defaultUser = { display_name: "default" };
const defaultSongs = [];
const defaultArtists = []
const defaultImage =
    "https://images.unsplash.com/photo-1589251204996-3367cc27f084?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";

function getTimeRange(index) {
    let term = "short_term";
    if (index === undefined) {
        index = 0;
    }
    switch (index) {
        case 1:
            term = "medium_term";
            break;
        case 2:
            term = "long_term";
            break;
        default:
            term = "short_term";
            break;
    }
    console.log("changing to " + term);
    return term;
}

export default function Dashboard({ token }) {
    const [user, setUser] = useState(defaultUser);
    const [topSongs, setTopSongs] = useState(defaultSongs);
    const [topArtists, setTopArtists] = useState(defaultArtists);
    const [timeRangeSongs, setTimeRangeSongs] = useState(getTimeRange());
    const [timeRangeArtists, setTimeRangeArtists] = useState(getTimeRange());

    function handleSongsClick(index) {
        setTimeRangeSongs(getTimeRange(index));
    }

    function handleArtistsClick(index) {
        setTimeRangeArtists(getTimeRange(index));
    }

    useEffect(() => {
        if (!token) {
            console.log("no token!")
            return;
          }
        
          const fetchData = async () => {
            const [userData, topSongsData, topArtistsData] = await Promise.all([
              fetchUser(token),
              fetchTopSongs(token, songCount, timeRangeSongs),
              fetchTopArtists(token, artistCount, timeRangeArtists)
            ]);
        
            setUser(userData);
            setTopSongs(topSongsData);
            setTopArtists(topArtistsData)
          };
        
          fetchData();
    }, [token, timeRangeSongs, timeRangeArtists])

    return (
        <div>
            <nav className="container">
                <h3>welcome, {user.display_name}</h3>
                <h4>visualize your music taste using AI</h4>
                <ListView
                    title="your top artists"
                    list={topArtists}
                    image={user.images ? user.images[0].url : defaultImage}
                    buttonHandler={handleArtistsClick}
                />
                <ImageGrid
                    title="your favourites"
                    songs={topSongs}
                    buttonHandler={handleSongsClick}
                />
            </nav>
        </div>
    );
}