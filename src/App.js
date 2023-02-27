import React from "react"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Footer from "./components/Footer"
import "./style.css"

import {useEffect, useState} from "react"

const CLIENT_ID = "6473932552584932a3ec9920a5d48230"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

export default function App() {
    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        console.log(token)
        setToken(token)
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("topSongs")
    }

    return (
        <div>
            {!token ?
                <div>
                    <Header />
                    <Login 
                        auth_endpoint={AUTH_ENDPOINT}
                        client_id={CLIENT_ID}
                        redirect_uri={REDIRECT_URI}
                        response_type={RESPONSE_TYPE}
                    />
                    <Footer />
                </div>:
                <div>
                    <Header />
                    <Dashboard token={token}/>
                    <button className="button-1" onClick={logout}>back</button>
                    <Footer />
                </div>
            }
        </div>
    );
}