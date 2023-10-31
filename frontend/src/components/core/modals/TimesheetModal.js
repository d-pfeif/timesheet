import React, { useState } from "react";
import Modal from "./Modal";
import Grid from "@mui/material/Unstable_Grid2/";
import { Button, TextField, Stack } from "@mui/material";

const TimesheetModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    console.log(name);
    console.log(description);
  };

  const closeTimesheetModal = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setDescription("");
    }, 500);
  };

  return (
    <Modal
      title="Timesheet Details"
      open={open}
      handleClose={closeTimesheetModal}
    >
      <Grid container spacing={3}>
        <Grid xs={12}>
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
        </Grid>
        <Grid xs={12}>
          <TextField
            label="Description"
            multiline
            fullWidth
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="outlined"
              color="error"
              onClick={closeTimesheetModal}
            >
              Close
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default TimesheetModal;
