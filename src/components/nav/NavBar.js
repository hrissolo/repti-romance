import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";


export const NavBar = props => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/">
          HalloTWEEN Town
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/messages">
          Messages
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/articles">
          Articles
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/tasks">
          Tasks
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/events">
          Events
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/friends">
          Friends
        </Link>
      </li>
    </ul>
  );
};
