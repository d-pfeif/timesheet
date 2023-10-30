import React, { useState } from "react";
import Modal from "./Modal";
import { useModal } from "../../../store/ModalContext";

const TimesheetModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Modal
      title="Timesheet Details"
      open={isModalOpen}
      handleClose={closeModal}
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Save</button>
    </Modal>
  );
};

export default TimesheetModal;
