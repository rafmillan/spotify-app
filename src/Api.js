import axios from "axios"
import { BASE_URL } from "./consts"

export async function fetchUser(token) {
    try {
        const response = await axios.get(`${BASE_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export async function fetchTopSongs(token, limit = 10, timeRange = 'short_term') {
    try {
        const response = await axios.get(`${BASE_URL}/me/top/tracks?limit=${limit}&time_range=${timeRange}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.items;
    } catch (error) {
        console.error('Error fetching top songs:', error);
        throw error;
    }
}

export async function fetchTopArtists(token, limit = 10, timeRange = 'short_term') {
    try {
        const response = await axios.get(`${BASE_URL}/me/top/artists?limit=${limit}&time_range=${timeRange}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.items;
    } catch (error) {
        console.error('Error fetching top songs:', error);
        throw error;
    }
}
