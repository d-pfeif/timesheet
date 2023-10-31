import React, { useState } from "react";
import Modal from "./Modal";
import Grid from "@mui/material/Unstable_Grid2/";
import { Button, TextField, Stack } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

const TimesheetModal = ({ open, onClose, timesheet = {} }) => {
  const [id, setId] = useState(timesheet.id || "");
  const [name, setName] = useState(timesheet.name || "");
  const [description, setDescription] = useState(timesheet.description || "");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setSaving(true);

    if (timesheet.id) {
      axios
        .put("/timesheets/" + timesheet.id, {
          name: name,
          description: description,
        })
        .then((res) => {
          onClose();
          navigate("/timesheets/" + res.data.id);
        })
        .catch((error) => {
          console.error("Error loading data:", error);
          throw error;
        })
        .finally(() => {
          setSaving(false);
        });
    } else {
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
    }
  };

  const closeTimesheetModal = () => {
    onClose();
    setTimeout(() => {
      setId(timesheet.id || "");
      setName(timesheet.name || "");
      setDescription(timesheet.description || "");
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
