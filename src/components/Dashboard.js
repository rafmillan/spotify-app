import React, { useEffect, useState } from "react";
import { fetchTopSongs, fetchUser, fetchTopArtists, fetchTopData} from "../Api";
import { Content } from "./Content";
import AlbumWall from "./AlbumWall";
import ArtistWall from "./ArtistWall";
import PieChart from "./PieChart"

import "../styles/tailwind.css"

const artistCount = 9;
const songCount = 9;
const defaultUser = { display_name: "default" };
const defaultSongs = [];
const defaultArtists = []

function getTimeRange(index) {
    let term = "short_term";
    if (index === undefined) {
        index = 0;
        console.log("index was undefined");
        return
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
    // console.log(term)
    return term;
}

export default function Dashboard({ token }) {
    const [user, setUser] = useState(defaultUser);
    const [topSongs, setTopSongs] = useState(defaultSongs);
    const [topArtists, setTopArtists] = useState(defaultArtists);
    const [topData, setTopData] = useState(defaultArtists);
    const [timeRangeSongs, setTimeRangeSongs] = useState(getTimeRange(0));
    const [timeRangeArtists, setTimeRangeArtists] = useState(getTimeRange(0));
    const [timeRangeData, setTimeRangeData] = useState(getTimeRange(0));

    function handleSongsClick(index) {
        if (index !== undefined){ 
        setTimeRangeSongs(getTimeRange(index));
        }
    }

    function handleArtistsClick(index) {
        if (index !== undefined){ 
        setTimeRangeArtists(getTimeRange(index));
        }
    }

    function handleDataClick(index) {
        if (index !== undefined){ 
        setTimeRangeData(getTimeRange(index));
        }
    }
    useEffect(() => {
        if (!token) {
            console.log("no token!")
            return;
          }
        
          const fetchData = async () => {
            const [userData, topSongsData, topArtistsData, topData] = await Promise.all([
              fetchUser(token),
              fetchTopSongs(token, songCount, timeRangeSongs),
              fetchTopArtists(token, artistCount, timeRangeArtists),
              fetchTopData(token, 6, timeRangeData)
            ]);
        
            setUser(userData);
            setTopSongs(topSongsData);
            setTopArtists(topArtistsData)
            setTopData(topData)
          };
        
          fetchData();
    }, [token, timeRangeSongs, timeRangeArtists, timeRangeData])

    return (
        <div>
            <h3 className="text-center text-5xl font-bold tracking-wide">
                welcome, {user.display_name}
            </h3>
            <h4 className="text-center text-2xl">
                visualize your music taste
            </h4>
            <Content
                title="your top songs"
                list={topSongs}
                buttonHandler={handleSongsClick}
                Component={AlbumWall}
            />
            <Content
                title="your top artists"
                list={topArtists}
                buttonHandler={handleArtistsClick}
                Component={ArtistWall}
            />
            <Content
                title="your top genres"
                list={topData}
                buttonHandler={handleDataClick}
                Component={PieChart}
            />

        </div>
    )
}