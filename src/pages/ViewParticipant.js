import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import api from "../api/api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-40%, -50%)",
    overflowY: "auto",
    maxWidth: "80%",
    maxHeight: "80%",
  },
};

export default function ViewParticipant({ isOpen, closeModal, participantId }) {
  const [participant, setParticipant] = useState([]);
  useEffect(() => {
    api
      .get(`Participants/${participantId}`)
      .then((response) => {
        console.log(response.data);
        setParticipant(response.data);
      })
      .catch((error) => {
        console.error("Error fetching participants:", error);
      });
  }, [participantId]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="modal">
        <h1>View Participant</h1>
        <form className="modal-form">
          <div className="form-row">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input type="text" value={participant.firstName} disabled />
            </div>
            <div>
              <label htmlFor="secondName">Last name</label>
              <input type="text" value={participant.lastName} disabled />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" value={participant.email} disabled />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="gender">Gender</label>
              <input value={participant.gender} disabled />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input type="tel" value={participant.phone} disabled />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="age">Age</label>
              <input value={participant.age} disabled />
            </div>
            <div>
              <label htmlFor="height">Height</label>
              <input value={participant.height} disabled />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="weight">Weight</label>
              <input value={participant.weight} disabled />
            </div>
            <div>
              <label htmlFor="tshirtSise">T-shirt size</label>
              <input value={participant.tshirtSize} disabled />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
