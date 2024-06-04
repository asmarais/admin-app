import React, { useState, useEffect } from "react";
import AddParticipant from "./AddParticipant";
import ViewParticipant from "./ViewParticipant";
import Pagination from "../components/Pagination";
import EditParticipant from "./EditParticipant";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Participants() {
  const [addParticipantIsOpen, setAddParticipantIsOpen] = useState(false);
  const [viewParticipantIsOpen, setViewParticipantIsOpen] = useState(false);
  const [updateParticipantIsOpen, setUpdateParticipantIsOpen] = useState(false);

  const [participantId, setParticipantId] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const apiPrivate = useAxiosPrivate();

  const auth = JSON.parse(localStorage.getItem("Auth"));

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
    apiPrivate
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
      apiPrivate.delete(`Participants/${id}`);
      toast.success("Participant deleted successfully!", {
        onClose: () => window.location.reload(),
      });
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
    participant.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="participant">
      <div className="head">
        <h1>Participants</h1>
        {auth && auth.role === "Admin" && (
          <button className="add" onClick={openAddParticipant}>
            <i className="bx bx-plus-circle"></i>
            New
          </button>
        )}
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
        <div className="order">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants
                .slice(firstPostIndex, lastPostIndex)
                .map((participant) => (
                  <tr key={participant.id}>
                    <td>{participant.firstName}</td>
                    <td>{participant.lastName}</td>
                    <td>{participant.email}</td>

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
                        {auth && auth.role === "Admin" && (
                          <>
                            <button
                              className="edit-button btn"
                              onClick={() =>
                                openUpdateParticipant(participant.id)
                              }
                            >
                              <i className="bx bxs-edit-alt"></i>
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
          totalPosts={filteredParticipants.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
}
