import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";


export const NavBar = props => {
  const lizard_user = localStorage.getItem("lizard_user")


  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/">
          Repti-Romance
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/matches">
          My Matches
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to={`/reptiles/detail/${lizard_user}`}>
          My Profile
        </Link>
      </li>
      <li className="navbar__item">
      <Link onClick={()=>{localStorage.clear()}} className="navbar__link" to="/logout">
          Log out 
        </Link>
        
      </li>
      
    </ul>
  );
};
