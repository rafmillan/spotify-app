import React from "react"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import LoginButton from "./components/LoginButton"
import Footer from "./components/Footer"
import { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE } from "./consts"
import "./styles/App.css"

import { useEffect, useState } from "react"

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.log(error)
        }
    }

    return [storedValue, setValue]
}

export default function App() {
    const [token, setToken] = useLocalStorage("token", "")

    useEffect(() => {
        const hash = window.location.hash
        if (!token && hash) {
            const newToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            setToken(newToken)
            window.location.hash = ""
        }
    }, [setToken, token])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("topSongs")
        window.localStorage.removeItem("topArtists")
    }

    return (
        <div>
            {!token ?
                <div>
                    <Header />
                    <LoginButton
                        endpoint={AUTH_ENDPOINT}
                        clientId={CLIENT_ID}
                        redirectUri={REDIRECT_URI}
                        responseType={RESPONSE_TYPE}
                    />
                    <Footer />
                </div> :
                <div>
                    <Header />
                    <Dashboard token={token} />
                    <button className="logout-button" onClick={logout}>back</button>
                    <Footer />
                </div>
            }
        </div>
    );
}