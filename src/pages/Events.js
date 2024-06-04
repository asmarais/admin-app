import React, { useState, useEffect } from "react";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import ViewEvent from "./ViewEvent";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Pagination from "../components/Pagination";

export default function Events() {
  const [addEventIsOpen, setAddEventIsOpen] = useState(false);
  const [viewEventIsOpen, setViewEventIsOpen] = useState(false);
  const [updateEventIsOpen, setUpdateEventIsOpen] = useState(false);

  const [eventId, setEventId] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const apiPrivate = useAxiosPrivate();
  const auth = JSON.parse(localStorage.getItem("Auth"));

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

  useEffect(() => {
    const fetchEvents = async () => {
      await apiPrivate
        .get("Events")
        .then((response) => {
          setEvents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    };
    fetchEvents();
  }, []);

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      apiPrivate.delete(`Events/${id}`);
      //we have to delete eventattributes
      window.location.reload();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }

  // Pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = events.slice(firstPostIndex, lastPostIndex);

  // Filtered data based on search input
  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="event">
      <div className="head">
        <h1>Events</h1>
        {auth && auth.role === "Admin" && (
          <button className="add" onClick={openAddEvent}>
            <i className="bx bx-plus-circle"></i>
            New
          </button>
        )}
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
        <div className="order">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Event Name</th>
                <th>Start Date</th>
                <th>Start Time</th>
                <th>End Date</th>
                <th>End Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents
                .slice(firstPostIndex, lastPostIndex)
                .map((event) => (
                  <tr key={event.id}>
                    <td>
                      <img
                        src={event.imageSrc}
                        alt="Image Description"
                        style={{ width: 70, height: 70 }}
                      />
                    </td>
                    <td>{event.eventName}</td>
                    <td>{new Date(event.start).toLocaleDateString()}</td>
                    <td>{new Date(event.start).toLocaleTimeString()}</td>
                    <td>{new Date(event.end).toLocaleDateString()}</td>
                    <td>{new Date(event.end).toLocaleTimeString()}</td>
                    <td>
                      <div className="row">
                        <button
                          className="info-button btn"
                          onClick={() => openViewEvent(event.id)}
                        >
                          <i className="bx bx-info-circle"></i>
                        </button>
                        {viewEventIsOpen && event.id === eventId && (
                          <ViewEvent
                            isOpen={viewEventIsOpen}
                            closeModal={closeViewEvent}
                            eventId={eventId}
                          />
                        )}
                        {auth && auth.role === "Admin" && (
                          <>
                            {/*
                            <button
                              className="edit-button btn"
                              onClick={() => openUpdateEvent(event.id)}
                            >
                              <i className="bx bxs-edit-alt"></i>
                            </button>
                            {updateEventIsOpen && event.id === eventId && (
                              <EditEvent
                                isOpen={updateEventIsOpen}
                                closeModal={closeUpdateEvent}
                                eventId={eventId}
                              />
                            )}
                            */}
                            <button
                              className="delete-button btn"
                              onClick={() => handleDelete(event.id)}
                            >
                              <i className="bx bxs-trash"></i>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPosts={filteredEvents.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
}
