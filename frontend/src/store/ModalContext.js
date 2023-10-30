import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({});

  const openModal = (modalName) => {
    setModals({ ...modals, [modalName]: true });
  };

  const closeModal = (modalName) => {
    setModals({ ...modals, [modalName]: false });
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
