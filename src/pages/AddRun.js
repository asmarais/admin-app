import React, { useEffect, useState } from "react";
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
export default function AddRun({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div>AddRun</div>
    </Modal>
  );
}
