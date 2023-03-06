import React from "react"
import { useEffect, useState } from "react"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import LoginButton from "./components/LoginButton"
import Footer from "./components/Footer"
import { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE } from "./consts"
import "./styles/tailwind.css"

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
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("topSongs")
        window.localStorage.removeItem("topArtists")
    }

    return (
        <div className="w-screen bg-bg-gray text-bone">
            <div>
                {!token ?
                    <div className="h-screen bg-bg-gray container flex flex-col mx-auto">
                        <Header />
                        <LoginButton
                            endpoint={AUTH_ENDPOINT}
                            clientId={CLIENT_ID}
                            redirectUri={REDIRECT_URI}
                            responseType={RESPONSE_TYPE}
                        />
                        <Footer />
                    </div> :
                    <div className="h-full bg-bg-gray container flex flex-col mx-auto">
                        <Header/>
                        <Dashboard token={token} />
                        <div className="basis-1/4 flex flex-col  items-center justify-center pt-8 pb-5">
                            <button 
                                className="w-1/5 text-sm bg-b-lpink hover:bg-b-pink active:bg-b-dpink0 text-white font-bold py-2 px-4 rounded-full"
                                onClick={logout}
                            >
                                back
                            </button>
                        </div>
                        <Footer />
                    </div>
                }
            </div>
        </div>
    )
}