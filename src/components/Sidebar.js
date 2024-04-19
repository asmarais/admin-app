import React from "react";
import "boxicons/css/boxicons.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ hidden }) {
  const [activeMenuItem, setActiveMenuItem] = useState("");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  return (
    <section className={`sidebar ${hidden ? "hide" : ""}`}>
      <a href="#" className="brand">
        <img
          src={require("../assets/logo.jpg")}
          alt="L-Mobile Logo"
          className="logo-img"
        />
      </a>

      <ul className="side-menu top">
        <li className={activeMenuItem === "dashboard" ? "active" : ""}>
          <Link onClick={() => handleMenuItemClick("dashboard")} to="/">
            <i className="bx bxs-dashboard"></i>
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li className={activeMenuItem === "participants" ? "active" : ""}>
          <Link
            onClick={() => handleMenuItemClick("participants")}
            to="/participants"
          >
            <i className="bx bx-run"></i>
            <span className="text">Participants</span>
          </Link>
        </li>
        <li className={activeMenuItem === "events" ? "active" : ""}>
          <Link onClick={() => handleMenuItemClick("events")} to="/events">
            <i className="bx bxs-calendar-event"></i>
            <span className="text">Events</span>
          </Link>
        </li>
        <li className={activeMenuItem === "participantruns" ? "active" : ""}>
          <Link
            onClick={() => handleMenuItemClick("participantruns")}
            to="/participantruns"
          >
            <i className="bx bxs-data"></i>
            <span className="text">Runs</span>
          </Link>
        </li>

        <li className={activeMenuItem === "team" ? "active" : ""}>
          <Link onClick={() => handleMenuItemClick("team")} to="/team">
            <i className="bx bxs-group"></i>
            <span className="text">Team</span>
          </Link>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <a href="#" className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
