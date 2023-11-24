import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <NavLink
          to="/faq"
          className={({ isActive }) => (isActive ? "link activeLink" : "link")}
        >
          FAQ
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "link activeLink" : "link")}
        >
          Contact
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
