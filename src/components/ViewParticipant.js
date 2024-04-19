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
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
  },
};

export default function ViewParticipant({ isOpen, closeModal, participantId }) {
  const [participant, setParticipant] = useState([]);
  useEffect(() => {
    api
      .get(`Participants/${participantId}`)
      .then((response) => {
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
              <label htmlFor="secondName">Second name</label>
              <input type="text" value={participant.secondName} disabled />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="country">Country</label>
              <input type="text" value={participant.country} disabled />
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <input type="number" value={participant.zipCode} disabled />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="city">City</label>
              <input type="text" value={participant.city} disabled />
            </div>
            <div>
              <label htmlFor="street">Street</label>
              <input type="text" value={participant.street} disabled />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="birthday">Birthday</label>
              <input type="date" value={participant.birthday} disabled />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <input value={participant.gender} disabled />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" value={participant.email} disabled />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input type="tel" value={participant.phone} disabled />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
