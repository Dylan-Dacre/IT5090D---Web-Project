import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMenuPage =
    !isHomePage &&
    ["/dashboard", "/tasks", "/lists", "/notes", "/goals"].includes(
      location.pathname
    );
  const renderHeader = !isHomePage || isMenuPage;

  return renderHeader ? (
    <header>
      <div className="header-container">
        <p className="header-title">MooDoo</p>
        <div className="nav-links">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "link activeLink" : "link"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? "link activeLink" : "link"
            }
          >
            Tasks
          </NavLink>
          <NavLink
            to="/lists"
            className={({ isActive }) =>
              isActive ? "link activeLink" : "link"
            }
          >
            Lists
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              isActive ? "link activeLink" : "link"
            }
          >
            Notes
          </NavLink>
          <NavLink
            to="/goals"
            className={({ isActive }) =>
              isActive ? "link activeLink" : "link"
            }
          >
            Goals
          </NavLink>
        </div>
      </div>
    </header>
  ) : null;
};

export default Header;
