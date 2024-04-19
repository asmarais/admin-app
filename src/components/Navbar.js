import React, { useState } from "react";
import "boxicons/css/boxicons.min.css"; // Import Boxicons CSS
import Sidebar from "./Sidebar";

export default function Navbar({ onMenuClick }) {
  return (
    <nav>
      <i className="bx bx-menu" onClick={onMenuClick}></i>
      <a href="#" className="profile">
        <img src="img/people.png" alt="Profile" />
      </a>
    </nav>
  );
}
