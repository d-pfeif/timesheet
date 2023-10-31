import React, { useState } from "react";
import Modal from "./Modal";
import Grid from "@mui/material/Unstable_Grid2/";
import { Button, TextField, Stack } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

const TimesheetModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setSaving(true);

    axios
      .post("/timesheets", {
        timesheet: {
          name: name,
          description: description,
        },
      })
      .then((res) => {
        onClose();
        navigate("/timesheets/" + res.data.id);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        throw error;
      });
  };

  const closeTimesheetModal = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setDescription("");
      setSaving(false);
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
            <LoadingButton
              loading={saving}
              disabled={!name || !description}
              variant="contained"
              onClick={handleSave}
            >
              Save
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default TimesheetModal;
