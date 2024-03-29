import React, { useState } from "react";
import Modal from "./Modal";
import Grid from "@mui/material/Unstable_Grid2/";
import { Button, TextField, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "../../../utils/axiosConfig";
import moment from "moment";

const LineItemModal = ({ open, onClose, lineItem = {}, addLineItem }) => {
  // Initialize state
  const [id, setId] = useState(lineItem.id || "");
  const [date, setDate] = useState(lineItem.date || "");
  const [minutes, setMinutes] = useState(lineItem.minutes || "");
  const [saving, setSaving] = useState(false);

  // Function to close the line item modal
  const closeLineItemModal = () => {
    onClose();
    setTimeout(() => {
      // Clear state
      setId(lineItem.id || "");
      setDate(lineItem.date || "");
      setMinutes(lineItem.minutes || "");
      setSaving(false);
    }, 500);
  };

  // Function to handle saving line item changes
  const handleSave = () => {
    setSaving(true);

    const requestData = {
      date: date,
      minutes: minutes,
      timesheet_id: lineItem.timesheetId,
    };

    const request = id
      ? axios.patch("/line_items/" + id, requestData)
      : axios.post("/line_items", { line_item: requestData });

    request
      .then((res) => {
        // Add the newly created item to the list
        // If we allow users to update line items, we'd
        // need to extend this functionality to find/update
        // the correct line item.
        addLineItem({
          minutes: res.data.minutes,
          date: moment(res.data.date).format("MMMM Do YYYY"),
        });
        closeLineItemModal();
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
      title="Line Item Details"
      open={open}
      handleClose={closeLineItemModal}
    >
      <Grid container spacing={2} style={{ paddingTop: "8px" }}>
        <Grid xs>
          <DatePicker
            label="Date"
            value={date || null}
            onChange={(newDate) => setDate(newDate)}
          />
        </Grid>
        <Grid xs>
          <TextField
            label="Minutes"
            type="number"
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
