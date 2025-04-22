import React from "react";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-right">
        <span>Jashit Goyal</span>
      </div>
      <ul className="nav-left">
        <li>
          <a href="#">HOME</a>
        </li>
        <li>
          <a href="#">PROJECTS</a>
        </li>
        <li>
          <a href="#">CONTACT ME</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
