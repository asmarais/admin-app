import React, { useState } from "react";
import AddEvent from "../components/AddEvent";

export default function Events() {
  const [addEventIsOpen, setAddEventIsOpen] = useState(false);
  const [viewEventIsOpen, setViewEventIsOpen] = useState(false);
  const [updateEventIsOpen, setUpdateEventIsOpen] = useState(false);

  const [EventId, setEventId] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  //Create Modal
  function openAddEvent() {
    setAddEventIsOpen(true);
  }
  function closeAddEvent() {
    setAddEventIsOpen(false);
  }
  //Read Modal
  function openViewEvent(Id) {
    setViewEventIsOpen(true);
    setEventId(Id);
  }
  function closeViewEvent() {
    setViewEventIsOpen(false);
  }
  //Update Modal
  function openUpdateEvent(Id) {
    setUpdateEventIsOpen(true);
    setEventId(Id);
  }
  function closeUpdateEvent() {
    setUpdateEventIsOpen(false);
  }

  return (
    <main className="event">
      <div className="head">
        <h1>Events</h1>
        <button className="add" onClick={openAddEvent}>
          <i className="bx bx-plus-circle"></i>
          New Event
        </button>
        <AddEvent isOpen={addEventIsOpen} closeModal={closeAddEvent} />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Events"
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="bx bx-search search-icon"></i>
      </div>
      <div className="data">
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Maximum Participant</th>
              <th>Days before event</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>Doe</td>
              <td>01-10-2021</td>
              <td>john.doe@gmail.com</td>
              <td>22910667</td>
              <td>Male</td>
              <td>
                <div className="row">
                  <button className="info-button btn">
                    <i class="bx bx-info-circle"></i>
                  </button>
                  <button className="edit-button btn">
                    <i class="bx bxs-edit-alt"></i>
                  </button>
                  <button className="delete-button btn ">
                    <i class="bx bxs-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
