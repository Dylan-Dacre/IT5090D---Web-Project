import React from "react";
import "./LoginButton.css";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname === "/" ? "/dashboard" : undefined,
      },
    });
  };

  return (
    <button className="login-button" onClick={handleLogin}>
      {" "}
      <span className="login-button-content">
        <span className="icon-user">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <span className="login-button-text">Log In</span>
      </span>
    </button>
  );
};

export default LoginButton;
