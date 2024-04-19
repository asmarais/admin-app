import React from "react";
import "../App.css";
export default function Dashboard() {
  return (
    <main className="dashbord">
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
        </div>
      </div>

      <ul className="box-info">
        <li>
          <i className="bx bxs-calendar-check"></i>
          <span className="text">
            <h3>1020</h3>
            <p>Events</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-group"></i>
          <span className="text">
            <h3>2834</h3>
            <p>Participants</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="todo"></div>

        <div className="order">
          <div className="head">
            <h3>Upcoming Events</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Start Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>@obj.EventName</p>
                </td>
                <td>@obj.Start</td>
                <td>@obj.Status</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
