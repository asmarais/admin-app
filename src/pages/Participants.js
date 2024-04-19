import React, { useState, useEffect } from "react";
import AddParticipant from "../components/AddParticipant";
import ViewParticipant from "../components/ViewParticipant";
import api from "../api/api";
import Pagination from "../components/Pagination";
import EditParticipant from "../components/EditParticipant";

export default function Participants() {
  const [addParticipantIsOpen, setAddParticipantIsOpen] = useState(false);
  const [viewParticipantIsOpen, setViewParticipantIsOpen] = useState(false);
  const [updateParticipantIsOpen, setUpdateParticipantIsOpen] = useState(false);

  const [participantId, setParticipantId] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  //Create Modal
  function openAddParticipant() {
    setAddParticipantIsOpen(true);
  }

  function closeAddParticipant() {
    setAddParticipantIsOpen(false);
  }

  //Read Modal
  function openViewParticipant(Id) {
    setViewParticipantIsOpen(true);
    setParticipantId(Id);
  }

  function closeViewParticipant() {
    setViewParticipantIsOpen(false);
  }

  //Update Modal
  function openUpdateParticipant(Id) {
    setUpdateParticipantIsOpen(true);
    setParticipantId(Id);
  }

  function closeUpdateParticipant() {
    setUpdateParticipantIsOpen(false);
  }

  useEffect(() => {
    api
      .get("Participants")
      .then((response) => {
        setParticipants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching participants:", error);
      });
  }, []);

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this participant?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      api.delete(`Participants/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  }

  // Pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = participants.slice(firstPostIndex, lastPostIndex);

  // Filtered data based on search input
  const filteredParticipants = participants.filter((participant) =>
    participant.firstName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="participant">
      <div className="head">
        <h1>Participants</h1>
        <button className="add" onClick={openAddParticipant}>
          <i className="bx bx-plus-circle"></i>
          New Participant
        </button>
        <AddParticipant
          isOpen={addParticipantIsOpen}
          closeModal={closeAddParticipant}
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Participants"
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="bx bx-search search-icon"></i>
      </div>
      <div className="data">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Second Name</th>
              <th>Birthday</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredParticipants
              .slice(firstPostIndex, lastPostIndex)
              .map((participant) => (
                <tr key={participant.id}>
                  <td>{participant.firstName}</td>
                  <td>{participant.secondName}</td>
                  <td>{participant.birthday}</td>
                  <td>{participant.email}</td>
                  <td>{participant.phone}</td>
                  <td>{participant.gender}</td>
                  <td>
                    <div className="row">
                      <button
                        className="info-button btn"
                        onClick={() => openViewParticipant(participant.id)}
                      >
                        <i className="bx bx-info-circle"></i>
                      </button>
                      {viewParticipantIsOpen &&
                        participant.id === participantId && (
                          <ViewParticipant
                            isOpen={viewParticipantIsOpen}
                            closeModal={closeViewParticipant}
                            participantId={participantId}
                          />
                        )}

                      <button
                        className="edit-button btn"
                        onClick={() => openUpdateParticipant(participant.id)}
                      >
                        <i class="bx bxs-edit-alt"></i>
                      </button>
                      {updateParticipantIsOpen &&
                        participant.id === participantId && (
                          <EditParticipant
                            isOpen={updateParticipantIsOpen}
                            closeModal={closeUpdateParticipant}
                            participantId={participantId}
                          />
                        )}
                      <button
                        className="delete-button btn"
                        onClick={() => handleDelete(participant.id)}
                      >
                        <i class="bx bxs-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          totalPosts={filteredParticipants.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
}
