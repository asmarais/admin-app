import React, { useEffect, useState } from "react";
import "../App.css";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
export default function Dashboard() {
  const { auth } = useAuth();
  const apiPrivate = useAxiosPrivate();
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [fiveFirstEvents, setFiveFirstEvents] = useState([]);

  useEffect(() => {
    apiPrivate
      .get("Events")
      .then((response) => {
        const data = response.data;
        setEvents(data.length);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    apiPrivate
      .get("Participants")
      .then((response) => {
        const data = response.data;
        setParticipants(data.length);
      })
      .catch((error) => {
        console.error("Error fetching participant:", error);
      });
  }, []);

  useEffect(() => {
    apiPrivate
      .get("Events/GetFirstFiveOpenEvents")
      .then((response) => {
        const data = response.data;
        setFiveFirstEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching First five events:", error);
      });
  }, []);

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
            <h3>{events}</h3>
            <p>Events</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-group"></i>
          <span className="text">
            <h3>{participants}</h3>
            <p>Participants</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Upcoming Events</h3>
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
              {fiveFirstEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.eventName}</td>
                  <td>{new Date(event.start).toLocaleDateString()}</td>
                  <td>{event.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
