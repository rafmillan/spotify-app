// import React from "react"
// import "../styles/Login.css"
// import { USER_TOP_READ } from "../consts"

// export default function LoginButton({ endpoint, clientId, redirectUri, responseType }) {
//   return (
//     <a 
//     className="login-button"
//     href={ `${endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${USER_TOP_READ}&response_type=${responseType}` }>
//         Login
//     </a>
//   )
// }

import React from "react"
import PropTypes from "prop-types"
import { USER_TOP_READ} from "../consts"
import "../styles/Login.css"

const  LoginButton = ({ endpoint, clientId, redirectUri, responseType }) => {
  const loginUrl = `${endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${USER_TOP_READ}&response_type=${responseType}`

  const handleLogin = (event) => {
    event.preventDefault()
    window.location.href = loginUrl
  }

  return (
    <button className="login-button" onClick={handleLogin}>
      Login
    </button>
  )
}

LoginButton.propTypes = {
  endpoint: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  redirectUri: PropTypes.string.isRequired,
  responseType: PropTypes.string.isRequired,
}

export default LoginButton