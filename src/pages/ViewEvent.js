import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
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

export default function ViewEvent({ isOpen, closeModal, eventId }) {
  const [event, setEvent] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState({});
  const apiPrivate = useAxiosPrivate();

  useEffect(() => {
    apiPrivate
      .get(`Events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [eventId]);

  useEffect(() => {
    apiPrivate
      .get("EventTypes")
      .then((response) => {
        setEventTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching eventTypes:", error);
      });
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="modal">
        <h1>View Event</h1>
        {event && (
          <form className="modal-form">
            <div className="form-row">
              <div>
                <label htmlFor="event">Event Name</label>
                <input type="text" value={event.eventObj.eventName} disabled />
              </div>
              <div>
                <label htmlFor="status">Status</label>
                <select value={event.eventObj.status} disabled>
                  <option value="">Select</option>
                  <option value="open">Open</option>
                  <option value="close">Close</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div>
                <label htmlFor="start">Start Date</label>
                <input
                  type="datetime-local"
                  value={event.eventObj.start}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="end">End Date</label>
                <input
                  type="datetime-local"
                  value={event.eventObj.end}
                  disabled
                />
              </div>
            </div>
            <label htmlFor="description">
              Desciption <span className="required">*</span>
            </label>
            <textarea
              value={event.eventObj.description}
              disabled
              rows={5}
              cols={40}
              style={{ resize: "vertical" }}
            />

            <div className="form-row">
              <div>
                <label htmlFor="status">Event Type</label>

                <div className="checkbox-container">
                  {eventTypes.map((item) => (
                    <div key={item.id}>
                      <input
                        type="checkbox"
                        id={item.type}
                        name={item.id}
                        checked={
                          event.attributeObj.some(
                            (attr) => attr.type === item.type
                          )
                            ? true
                            : false
                        }
                        disabled
                      />
                      <label htmlFor={item.type}>{item.type}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
