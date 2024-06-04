import Modal from "react-modal";
import React, { useState, useEffect } from "react";
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
    console.log(editedParticipant);
    const obj = {
      email: editedParticipant.email,
      firstName: editedParticipant.firstName,
      secondName: editedParticipant.lastName,
      phone: editedParticipant.phone,
      age: editedParticipant.age,
      height: editedParticipant.height,
      weight: editedParticipant.weight,
      tshirtSize: editedParticipant.tshirtSize,
      gender: editedParticipant.gender,
    };
    try {
      await api.put(`Participants/${participantId}`, obj);
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
              <label htmlFor="lastName">
                Last Name<span className="required">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={editedParticipant.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="email">
                Email<span className="required">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={editedParticipant.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="gender">
                Gender <span className="required">*</span>
              </label>
              <select
                name="gender"
                value={editedParticipant.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="phone">
                Phone <span className="required">*</span>
              </label>
              <input
                type="tel"
                value={editedParticipant.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="age">
                Age <span className="required">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={editedParticipant.age}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="height">
                Height (kg) <span className="required">*</span>
              </label>
              <input
                type="number"
                name="height"
                value={editedParticipant.height}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="weight">
                Weight (kg) <span className="required">*</span>
              </label>
              <input
                type="number"
                name="weight"
                value={editedParticipant.weight}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="tshirtSize">
                T-shirt Size <span className="required">*</span>
              </label>
              <select
                name="tshirtSize"
                value={editedParticipant.tshirtSize}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="XS">Extra Small</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
                <option value="XXL">Double Extra Large</option>
              </select>
            </div>
          </div>
          <button className="add">Save</button>
        </form>
      </div>
    </Modal>
  );
}
