import React, { useState, useEffect } from "react";
import AddRun from "./AddRun";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function Runs() {
  const [addRunIsOpen, setAddRunIsOpen] = useState(false);
  const [viewRunIsOpen, setViewRunIsOpen] = useState(false);
  const [updateRunIsOpen, setUpdateRunIsOpen] = useState(false);
  const [runs, setRuns] = useState([]);
  const [filteredRuns, setFilteredRuns] = useState([]);
  const [emailFilter, setEmailFilter] = useState("");
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const apiPrivate = useAxiosPrivate();

  useEffect(() => {
    apiPrivate
      .get("ParticipantRuns")
      .then((response) => {
        setRuns(response.data);
        setFilteredRuns(response.data);
      })
      .catch((error) => {
        console.error("Error fetching runs:", error);
      });
  }, []);

  const filterRuns = () => {
    let filtered = runs;
    if (emailFilter) {
      filtered = filtered.filter((run) =>
        run.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }
    if (eventNameFilter) {
      filtered = filtered.filter((run) =>
        run.eventName.toLowerCase().includes(eventNameFilter.toLowerCase())
      );
    }
    if (eventTypeFilter) {
      filtered = filtered.filter((run) =>
        run.eventType.toLowerCase().includes(eventTypeFilter.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((run) =>
        run.status.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }
    setFilteredRuns(filtered);

    // Clear the filters
    setEmailFilter("");
    setEventNameFilter("");
    setEventTypeFilter("");
    setStatusFilter("");
  };

  // Create Modal
  function openAddRun() {
    setAddRunIsOpen(true);
  }

  function closeAddRun() {
    setAddRunIsOpen(false);
  }

  return (
    <main className="participantrun">
      <div className="head">
        <h1>Runs</h1>
        {/*
        <button className="add" onClick={openAddRun}>
          <i className="bx bx-plus-circle"></i>
          New
        </button>
        <AddRun isOpen={addRunIsOpen} closeModal={closeAddRun} />
        */}
      </div>
      <div className="filter-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search by Email"
            className="search-input"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Search by Event Name"
            className="search-input"
            value={eventNameFilter}
            onChange={(e) => setEventNameFilter(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Event Type"
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
        <button className="add" onClick={filterRuns}>
          Filter
        </button>
      </div>
      <div className="data">
        <div className="order">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Event Name</th>
                <th>Event Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRuns.map((run) => (
                <tr key={`${run.email}-${run.eventName}-${run.eventType}`}>
                  <td>{run.email}</td>
                  <td>{run.eventName}</td>
                  <td>{run.eventType}</td>
                  <td>{run.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
