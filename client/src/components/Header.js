import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const goHome = () => {
    navigate("/");
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const navigateTo = (path) => {
    navigate(path);
    setShowDropdown(false);
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
          <button className="menu-button" onClick={toggleDropdown}>
            <span className="icon-menu">
              <FontAwesomeIcon icon={showDropdown ? faBarsStaggered : faBars} />
            </span>
          </button>
        )}
        <p className="header-title">XXX</p>
        {showDropdown && (
          <div className="dropdown">
            <button
              onClick={() => navigateTo("/dashboard")}
              className={location.pathname === "/dashboard" ? "active" : ""}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigateTo("/tasks")}
              className={location.pathname === "/tasks" ? "active" : ""}
            >
              Tasks
            </button>
            <button
              onClick={() => navigateTo("/lists")}
              className={location.pathname === "/lists" ? "active" : ""}
            >
              Lists
            </button>
            <button
              onClick={() => navigateTo("/notes")}
              className={location.pathname === "/notes" ? "active" : ""}
            >
              Notes
            </button>
          </div>
        )}
      </div>
    </header>
  ) : null;
};

export default Header;
