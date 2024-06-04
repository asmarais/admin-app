import Modal from "react-modal";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function EditUser({ isOpen, closeModal, userId }) {
  const [user, setUser] = useState({ userName: "", role: "" });
  const apiPrivate = useAxiosPrivate();

  useEffect(() => {
    if (isOpen && userId) {
      apiPrivate
        .get(`Users/${userId}`)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [isOpen, userId, apiPrivate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User data submitted:", user);
    try {
      await apiPrivate.put(`Users/${userId}`, user);
      toast.success("User updated successfully!", {
        onClose: () => window.location.reload(),
      });
      closeModal();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
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
        <h1>Edit User</h1>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="userName">
            Username <span className="required">*</span>
          </label>
          <input
            name="userName"
            value={user.userName}
            onChange={handleChange}
          />

          <label htmlFor="role">
            Role <span className="required">*</span>
          </label>
          <select name="role" value={user.role} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
          </select>
          <button className="add">Submit</button>
        </form>
      </div>
    </Modal>
  );
}
