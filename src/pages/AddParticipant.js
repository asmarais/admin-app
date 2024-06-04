import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import participantSchema from "../utils/participantSchema";
import api from "../api/api";

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

export default function AddParticipant({ isOpen, closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(participantSchema),
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...participant } = data;
    console.log(participant);

    try {
      const response = await api.post("Participants", participant);
      console.log("Response from backend:", response.data);
      window.location.reload();
      closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
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
        <h1>Add Participant</h1>
        <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div>
              <label htmlFor="firstName">
                First name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                {...register("firstName")}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="lastName">
                Last name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                {...register("lastName")}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName.message}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input type="email" id="email" {...register("email")} />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="passwordHash">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="passwordHash"
                {...register("passwordHash")}
              />
              {errors.passwordHash && (
                <span className="error">{errors.passwordHash.message}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="gender">
                Gender <span className="required">*</span>
              </label>
              <select id="gender" {...register("gender")}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <span className="error">{errors.gender.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="phone">
                Phone <span className="required">*</span>
              </label>
              <input type="tel" id="phone" {...register("phone")} />
              {errors.phone && (
                <span className="error">{errors.phone.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="age">
                Age <span className="required">*</span>
              </label>
              <input type="number" id="age" {...register("age")} />
              {errors.age && (
                <span className="error">{errors.age.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="height">
                Height (cm) <span className="required">*</span>
              </label>
              <input type="number" id="height" {...register("height")} />
              {errors.height && (
                <span className="error">{errors.height.message}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="weight">
                Weight (kg) <span className="required">*</span>
              </label>
              <input type="number" id="weight" {...register("weight")} />
              {errors.weight && (
                <span className="error">{errors.weight.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="tshirtSize">
                T-shirt Size <span className="required">*</span>
              </label>
              <select id="tshirtSize" {...register("tshirtSize")}>
                <option value="">Select</option>
                <option value="XS">Extra Small</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
                <option value="XXL">Double Extra Large</option>
              </select>
              {errors.tshirtSize && (
                <span className="error">{errors.tshirtSize.message}</span>
              )}
            </div>
          </div>
          <button type="submit" className="add">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
}
