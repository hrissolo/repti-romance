import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";


export const NavBar = props => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/">
          Repti-Romance
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/messages">
          Messages
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/myProfile">
          My Profile
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/login">
          Log out 
        </Link>
      </li>
      
    </ul>
  );
};
