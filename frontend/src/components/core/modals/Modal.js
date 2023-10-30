import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const Modal = ({ children, title, open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
