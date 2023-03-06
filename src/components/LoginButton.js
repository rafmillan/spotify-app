import React from "react";
import PropTypes from "prop-types";
import { USER_TOP_READ } from "../consts";
import "../styles/tailwind.css";

const LoginButton = ({ endpoint, clientId, redirectUri, responseType }) => {
  const loginUrl = `${endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${USER_TOP_READ}&response_type=${responseType}`;

  const handleLogin = (event) => {
    event.preventDefault();
    window.location.href = loginUrl;
  };
  return (
    <div className="basis-1/4 flex flex-col  items-center justify-center py-8">
      <button 
        className="text-2xl bg-b-lpink hover:bg-b-pink active:bg-b-dpink text-white font-bold py-2 px-8 rounded-full"
        onClick={handleLogin}
      >
        login
      </button>
    </div>
  );
};

LoginButton.propTypes = {
  endpoint: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  redirectUri: PropTypes.string.isRequired,
  responseType: PropTypes.string.isRequired,
};

export default LoginButton;