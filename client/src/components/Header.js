import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => {
    navigate("/");
  };

  const renderHeader = location.pathname !== "/";

  return renderHeader ? (
    <header>
      <div className="header-container">
        <button onClick={goHome}>
          <span className="icon-home">
            <FontAwesomeIcon icon={faHome} />
          </span>
        </button>
      </div>
    </header>
  ) : null;
};

export default Header;
