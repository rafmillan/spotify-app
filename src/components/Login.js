import React from "react"

const user_top_read = "user-top-read"
export default function Login({auth_endpoint, client_id, redirect_uri, response_type}) {
    return (
        <a 
            className="button-1"
            href={ `${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${user_top_read}&response_type=${response_type}` }>
                Login
        </a>
    );
}