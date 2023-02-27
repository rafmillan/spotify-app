import React, { useEffect, useState } from "react";
import ListView from "./TopList";
import "../styles/Dashboard.css";

import { fetchTopSongs, fetchUser } from "../Api";

const count = 10;
const defaultUser = { display_name: "default" };
const defaultSongs = [];
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
    const [timeRange, setTimeRange] = useState(getTimeRange());

    function handleButtonClick(index) {
        setTimeRange(getTimeRange(index));
    }

    useEffect(() => {
        if (!token) {
            console.log("no token!")
            return;
          }
        
          const fetchData = async () => {
            const [userData, topSongsData] = await Promise.all([
              fetchUser(token),
              fetchTopSongs(token, count, timeRange)
            ]);
        
            setUser(userData);
            setTopSongs(topSongsData);
          };
        
          fetchData();
    }, [token, timeRange])

    return (
        <div>
            <nav className="container">
                <h3>welcome, {user.display_name}</h3>
                <h4>visualize your music taste using AI</h4>
                <ListView
                    title="your top songs"
                    list={topSongs}
                    image={user.images ? user.images[0].url : defaultImage}
                    buttonHandler={handleButtonClick}
                />
                <p> Hello guys</p>
            </nav>
        </div>
    );
}