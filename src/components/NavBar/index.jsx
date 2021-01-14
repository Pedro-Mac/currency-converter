import React from "react";

import logo from "../../images/svg/logo.svg";

import "./style.scss";

const NavBar = () => {
  return (
    <nav>
      <ul className="nav-links-group list">
        <li className="nav-links-item">
          <a href="/" className="nav-link">
            Personal
          </a>
        </li>
        <li className="nav-links-item">
          <a href="/" className="nav-link">
            Business
          </a>
        </li>
        <li className="nav-links-item">
          <a href="/" className="nav-link">
            Partners
          </a>
        </li>
      </ul>
      <div className="img-container">
        <img src={logo} alt="Uphold logo" />
      </div>
      <div className="nav-link-container">
        <a href="/" className="nav-link-highlight">
          Log In
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
