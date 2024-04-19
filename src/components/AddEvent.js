import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto", // Add this line to enable vertical scrolling
  },
};
export default function AddParticipant({ isOpen, closeModal }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="modal">
        <h1>Add Event</h1>
        <form className="modal-form">
          <div className="form-row">
            <div>
              <label htmlFor="eventName">
                Event Name <span className="required">*</span>
              </label>
              <input type="text" id="eventName" name="eventName" required />
            </div>
            <div>
              <label htmlFor="status">
                Status <span className="required">*</span>
              </label>
              <select id="status" name="status" required>
                <option value="">Select</option>
                <option value="open">Open</option>
                <option value="close">Close</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="start">
                Start Date<span className="required">*</span>
              </label>
              <input type="date" id="start" name="start" />
            </div>
            <div>
              <label htmlFor="end">
                End Date <span className="required">*</span>
              </label>
              <input type="date" id="end" name="end" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="maximumParticipants">Maximum Participants</label>
              <input
                type="number"
                id="maximumParticipants"
                name="maximumParticipants"
              />
            </div>
            <div>
              <label htmlFor="daysBeforeTheEvent">Days Before Event</label>
              <input
                type="number"
                id="daysBeforeTheEvent"
                name="daysBeforeTheEvent"
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="status">
                Event Type <span className="required">*</span>
              </label>
              <div className="checkbox-container">
                <div>
                  <input type="checkbox" id="checkbox1" />
                  <label htmlFor="checkbox1">Checkbox 1</label>
                </div>
                <div>
                  <input type="checkbox" id="checkbox2" />
                  <label htmlFor="checkbox2">Checkbox 2</label>
                </div>
                <div>
                  <input type="checkbox" id="checkbox3" />
                  <label htmlFor="checkbox3">Checkbox 3</label>
                </div>
              </div>
            </div>
          </div>

          <button className="add">Submit</button>
        </form>
      </div>
    </Modal>
  );
}
