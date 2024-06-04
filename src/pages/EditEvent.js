import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { format } from "date-fns";
const customStyles = {
  content: {
    top: "55%",
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

export default function EditEvent({ isOpen, closeModal, eventId }) {
  const [event, setEvent] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState();

  const apiPrivate = useAxiosPrivate();

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

  useEffect(() => {
    apiPrivate
      .get(`Events/${eventId}`)
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
        const initialCheckedBoxes = {};
        response.data.attributeObj.forEach((attr) => {
          initialCheckedBoxes[attr.eventTypeFK] = true;
        });
        setCheckedBoxes(initialCheckedBoxes);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [eventId]);

  const handleCheckboxChange = (id) => {
    setCheckedBoxes((prevChecked) => {
      const updatedChecked = { ...prevChecked, [id]: !prevChecked[id] };
      return updatedChecked;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("finall", checkedBoxes);
    console.log("Submitted data:", event);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="modal">
        <h1>Edit Event</h1>
        {event && (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
                <label htmlFor="eventName">Event Name</label>
                <input
                  type="text"
                  value={event.eventObj.eventName}
                  onChange={(e) =>
                    setEvent({
                      ...event,
                      eventObj: {
                        ...event.eventObj,
                        eventName: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="status">Status</label>
                <select
                  value={event.eventObj.status}
                  onChange={(e) =>
                    setEvent({
                      ...event,
                      eventObj: { ...event.eventObj, status: e.target.value },
                    })
                  }
                >
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
                  value={format(
                    new Date(event.eventObj.start),
                    "yyyy-MM-dd'T'HH:mm"
                  )}
                  onChange={(e) =>
                    setEvent({
                      ...event,
                      eventObj: { ...event.eventObj, start: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="end">End Date</label>
                <input
                  type="datetime-local"
                  value={format(
                    new Date(event.eventObj.end),
                    "yyyy-MM-dd'T'HH:mm"
                  )}
                  onChange={(e) =>
                    setEvent({
                      ...event,
                      eventObj: { ...event.eventObj, end: e.target.value },
                    })
                  }
                />
              </div>
            </div>

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
                        checked={checkedBoxes[item.id] || false}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <label htmlFor={item.type}>{item.type}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button className="add" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
