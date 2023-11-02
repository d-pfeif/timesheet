import React, { useState } from "react";
import Modal from "./Modal";
import Grid from "@mui/material/Unstable_Grid2/";
import { Button, TextField, Stack } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

const TimesheetModal = ({ open, onClose, timesheet = {}, updateTimesheet }) => {
  // Initialize state and hooks
  const [id, setId] = useState(timesheet.id || "");
  const [name, setName] = useState(timesheet.name || "");
  const [description, setDescription] = useState(timesheet.description || "");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // Function to close the timesheet modal
  const closeTimesheetModal = () => {
    onClose();
    setTimeout(() => {
      // Clear state
      setId(timesheet.id || "");
      setName(timesheet.name || "");
      setDescription(timesheet.description || "");
      setSaving(false);
    }, 500);
  };

  // Function to handle saving timesheet changes
  const handleSave = () => {
    setSaving(true);

    const requestData = {
      name: name,
      description: description,
    };

    const request = id
      ? axios.patch("/timesheets/" + id, requestData)
      : axios.post("/timesheets", { timesheet: requestData });

    request
      .then((res) => {
        onClose();

        // If viewing TimesheetShowPage, update state
        // Otherwise transition to new timesheet.
        if (id) {
          updateTimesheet(res.data);
        } else {
          navigate("/timesheets/" + res.data.id);
        }
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      })
      .finally(() => {
        setSaving(false);
      });
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
