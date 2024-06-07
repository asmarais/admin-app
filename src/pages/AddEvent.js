import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import eventSchema from "../utils/EventShema";

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
export default function AddEvent({ isOpen, closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema),
  });
  const [eventTypes, setEventTypes] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState({});
  const apiPrivate = useAxiosPrivate();
  const [selectedFile, setSelectedFile] = useState(null);
  //const [eventResponse, setEvenResponse] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (x) => {
      setImageSrc(x.target.result);
    };
  };

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
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedBoxes({ ...checkedBoxes, [name]: checked });
  };
  const onSubmit = async (data) => {
    const event = {
      ...data,
      status: "open",
      start: format(new Date(data.start), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
      end: format(new Date(data.end), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
      imageName: "image",
      imageFile: selectedFile,
      imageSrc: setImageSrc,
    };
    console.log(data);
    try {
      // Create the event
      const eventResponse = await apiPrivate.post("Events", event, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const eventId = eventResponse.data;
      console.log("id", eventResponse.data);
      console.log(checkedBoxes);
      // Add event attributes
      const checkedEventTypes = eventTypes.filter(
        (item) => checkedBoxes[item.id]
      );
      for (const eventType of checkedEventTypes) {
        try {
          const eventAttribute = {
            eventTypeFK: eventType.id,
            eventFK: eventId,
          };
          console.log("attribute", eventAttribute);
          const eventAttributeResponse = await apiPrivate.post(
            "EventAttributes",
            eventAttribute
          );
          console.log(eventAttributeResponse);
          const eventAttributeId = eventAttributeResponse.data.id;
          console.log("Event attribute is created with id", eventAttributeId);
          toast.success("Event added successfully!", {
            onClose: () => window.location.reload(),
          });
        } catch (error) {
          console.error("Error creating event attribute:", error);
        }
      }
      window.location.reload();
    } catch (error) {
      console.error("Error creating event:", error);
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
        <h1>Add Event</h1>
        <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div>
              <label htmlFor="eventName">
                Event Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                {...register("eventName")}
              />
              {errors.eventName && (
                <span className="error">{errors.eventName.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="status">
                Status <span className="required">*</span>
              </label>
              <select id="status" name="status" {...register("status")}>
                <option value="">Select</option>
                <option value="open">Open</option>
                <option value="close">Close</option>
              </select>
              {errors.status && (
                <span className="error">{errors.status.message}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="start">
                Start Date<span className="required">*</span>
              </label>
              <input
                type="datetime-local"
                id="start"
                name="start"
                {...register("start")}
              />
              {errors.start && (
                <span className="error">{errors.start.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="end">
                End Date <span className="required">*</span>
              </label>
              <input
                type="datetime-local"
                id="end"
                name="end"
                {...register("end")}
              />
              {errors.end && (
                <span className="error">{errors.end.message}</span>
              )}
            </div>
          </div>
          <label htmlFor="description">
            Desciption <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            {...register("description")}
            rows={5}
            cols={40}
            placeholder="Enter the event desciption here..."
            style={{ resize: "vertical" }}
          />
          {errors.description && (
            <span className="error">{errors.description.message}</span>
          )}
          <label htmlFor="image">
            Event Poster <span className="required">*</span>
          </label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            acceptlanguage="en"
          />

          <div className="form-row">
            <div>
              <label htmlFor="status">
                Event Type <span className="required">*</span>
              </label>

              <div className="checkbox-container">
                {eventTypes.map((item) => (
                  <div key={item.id}>
                    <input
                      type="checkbox"
                      id={item.type}
                      name={item.id}
                      checked={checkedBoxes[item.id] || false}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={item.type}>{item.type}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="add">Submit</button>
        </form>
      </div>
    </Modal>
  );
}
