import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => {
    navigate("/");
  };

  const isHomePage = location.pathname === "/";
  const isMenuPage =
    !isHomePage &&
    ["/dashboard", "/tasks", "/lists", "/notes"].includes(location.pathname);
  const renderHeader = !isHomePage || isMenuPage;

  return renderHeader ? (
    <header>
      <div className="header-container">
        <button className="home-button" onClick={goHome}>
          <span className="icon-home">
            <FontAwesomeIcon icon={faHome} />
          </span>
        </button>
        {isMenuPage && (
          <button className="menu-button">
            <span className="icon-menu">
              <FontAwesomeIcon icon={faBars} />
            </span>
          </button>
        )}
        <p className="header-title">XXX</p>
      </div>
    </header>
  ) : null;
};

export default Header;
