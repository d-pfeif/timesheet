import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Grid from "@mui/material/Unstable_Grid2/";
import { Button, TextField, Stack } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import LoadingButton from "@mui/lab/LoadingButton";

const LineItemModal = ({ open, onClose, lineItem = {} }) => {
  const [id, setId] = useState(lineItem.id || "");
  const [date, setDate] = useState(lineItem.date || "");
  const [minutes, setMinutes] = useState(lineItem.minutes || "");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const closeTimesheetModal = () => {
    onClose();
    setTimeout(() => {
      setId(lineItem.id || "");
      setDate(lineItem.date || "");
      setMinutes(lineItem.minutes || "");
      setSaving(false);
    }, 500);
  };

  const handleSave = () => {
    setSaving(true);

    const requestData = {
      date: date,
      minutes: minutes,
    };

    const request = lineItem.id
      ? axios.patch("/lineItems/" + lineItem.id, requestData)
      : axios.post("/lineItems", { line_item: requestData });

    request
      .then((res) => {
        onClose();
        navigate("/timesheets/" + res.data.timesheet_id);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        throw error;
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const closeLineItemModal = () => {
    onClose();
    setTimeout(() => {
      setId(lineItem.id || "");
      setDate(lineItem.date || "");
      setMinutes(lineItem.minutes || "");
      setSaving(false);
    }, 500);
  };

  return (
    <Modal
      title="Line Item Details"
      open={open}
      handleClose={closeTimesheetModal}
    >
      <Grid container spacing={3}>
        <Grid xs={12}>
          <TextField
            label="Date"
            variant="standard"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></TextField>
        </Grid>
        <Grid xs={12}>
          <TextField
            label="Minutes"
            fullWidth
            rows={4}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </Grid>
        <Grid xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="outlined"
              color="error"
              onClick={closeLineItemModal}
            >
              Close
            </Button>
            <LoadingButton
              loading={saving}
              disabled={!date || !minutes}
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

export default LineItemModal;
