import axios from "axios"

export const fetchUser = (token, setter) =>  {
    axios.get("https://api.spotify.com/v1/me", {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            
        }
    }).then(response => {
        setter(response.data)
    }).catch((err) => console.log(err))
}

export const fetchTopSongs = (token, count, setter, timeRange) => {
    console.log(timeRange)
    axios.get("https://api.spotify.com/v1/me/top/tracks", {
        params:{
            limit: count,
            time_range: timeRange
        },
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }).then(response => {
        setter(response.data.items)
    }).catch(((err) => console.log(err)))
}