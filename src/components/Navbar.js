import React, { useState } from "react";
import "boxicons/css/boxicons.min.css"; // Import Boxicons CSS
import Sidebar from "./Sidebar";
import useAuth from "../hooks/useAuth";

export default function Navbar({ onMenuClick }) {
  const auth = JSON.parse(localStorage.getItem("Auth"));

  return (
    <nav>
      <i className="bx bx-menu" onClick={onMenuClick}></i>
      <a className="profile">
        <p>{auth.userName}</p>
      </a>
    </nav>
  );
}
