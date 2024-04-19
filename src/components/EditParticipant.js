import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import api from "../api/api";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
  },
};

export default function EditParticipant({ isOpen, closeModal, participantId }) {
  const [participant, setParticipant] = useState({});
  const [editedParticipant, setEditedParticipant] = useState({});

  useEffect(() => {
    api
      .get(`Participants/${participantId}`)
      .then((response) => {
        setParticipant(response.data);
        setEditedParticipant(response.data);
      })
      .catch((error) => {
        console.error("Error fetching participants:", error);
      });
  }, [participantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedParticipant({ ...editedParticipant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`Participants/${participantId}`, editedParticipant);
      window.location.reload();
      closeModal();
    } catch (error) {
      console.error("Error updating participant:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="modal">
        <h1>Edit Participant</h1>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={editedParticipant.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="secondName">
                Second Name<span className="required">*</span>
              </label>
              <input
                type="text"
                name="secondName"
                value={editedParticipant.secondName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={editedParticipant.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="number"
                id="zipCode"
                name="zipCode"
                value={editedParticipant.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={editedParticipant.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={editedParticipant.street}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="birthday">
                Birthday<span className="required">*</span>
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={editedParticipant.birthday}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="gender">
                Gender <span className="required">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={editedParticipant.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedParticipant.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">
                Phone <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={editedParticipant.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="passwordHash">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="passwordHash"
                //value={editedParticipant.passwordHash}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="add">Edit</button>
        </form>
      </div>
    </Modal>
  );
}
