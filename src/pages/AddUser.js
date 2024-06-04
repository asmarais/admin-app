import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import * as yup from "yup";

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

const userSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().oneOf(["admin", "moderator"]).required("Role is required"),
});

export default function AddUser({ isOpen, closeModal }) {
  const apiPrivate = useAxiosPrivate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const eventResponse = await apiPrivate.post("auth/register", data);

      toast.success("User added successfully!", {
        onClose: () => window.location.reload(),
      });

      closeModal();
    } catch (error) {
      toast.error("Error creating user");
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="modal">
          <h1>Add User</h1>
          <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">
              Username <span className="required">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              {...register("username")}
            />
            {errors.username && (
              <span className="error">{errors.username.message}</span>
            )}
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
            <label htmlFor="role">
              Role <span className="required">*</span>
            </label>
            <select id="role" name="role" {...register("role")}>
              <option value="">Select</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
            {errors.role && (
              <span className="error">{errors.role.message}</span>
            )}
            <button className="add">Submit</button>
          </form>
        </div>
      </Modal>
    </>
  );
}
