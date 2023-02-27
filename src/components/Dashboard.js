import React from "react"
import ListView from "./TopList"

import {useEffect, useState} from "react"
import {fetchTopSongs, fetchUser} from "../Api"

const sampleImage = "https://images.unsplash.com/photo-1574169208496-ab47e11d74c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=800"
const count = 10;
const default_user = {
    display_name: "default"
}
const default_songs = []

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
            term = "short_term"
            break;
    }
    console.log("changin to " + term)
    return term;
}

export default function Dashboard({token}) {
    const [user, setUser] = useState({}) 
    const [topSongs, setTopSongs] = useState([])
    const [timeRange, setTimeRange] = useState(getTimeRange())

    function handleButtonClick(index) {
        setTimeRange(getTimeRange(index))
    }

    useEffect(() => {
        let user = window.localStorage.getItem("user")
        let topSongs = window.localStorage.getItem("topSongs")

        if(!token) {
            console.log("no token!")
        }

        if (!user) {
            window.localStorage.setItem("user", default_user)
        }
        fetchUser(token, setUser)

        if(!topSongs) {
            window.localStorage.setItem("topSongs", default_songs)
        }
        fetchTopSongs(token, count, setTopSongs, timeRange)
    }, [timeRange])

    return (
        <div>
            <nav className="container">
                <h3>welcome, {user.display_name}</h3>
                <h4>visualize your music taste using AI</h4>
                <ListView
                    title="your top songs"
                    list={topSongs}
                    image={sampleImage}
                    buttonHandler={handleButtonClick}
                />
            </nav>
		</div>
    );
}