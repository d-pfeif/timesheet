import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useModal } from "../store/ModalContext";
import { Card, Button, TextField, InputAdornment } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/";
import Header from "../layouts/Header";
import Table from "../components/core/Table";
import TimesheetModal from "../components/core/modals/TimesheetModal";
import LineItemModal from "../components/core/modals/LineItemModal";
import axios from "../utils/axiosConfig";
import moment from "moment";

const TimesheetShowPage = () => {
  // Initialize state and hooks
  const loaderData = useLoaderData(); // Fetch data from route loader (see index.js)
  const navigate = useNavigate();
  const { openModal, closeModal, modals } = useModal();
  const [lineItems, setLineItems] = useState([]);
  const [rate, setRate] = useState(0.0);

  // Extract data from loaderData
  const id = loaderData.id;
  const [name, setName] = useState(loaderData.name);
  const [description, setDescription] = useState(loaderData.description);

  // Define headers for the table
  const headers = [{ label: "Minutes" }, { label: "Date" }];

  // Effect to fetch line items when the component loads
  useEffect(() => {
    axios
      .get(`/line_items`, { params: { timesheet_id: id } })
      .then((response) => {
        // Format and set line items in state
        setLineItems(
          response.data.map((x) => ({
            minutes: x.minutes,
            date: moment(x.date).format("MMMM Do YYYY"),
          }))
        );
      })
      .catch((error) => {
        console.error("Error loading line items:", error);
      });
  }, [id]);

  // Calculate the total time from line items
  const totalTime = lineItems
    .map((x) => x.minutes)
    .reduce((pv, cv) => pv + cv, 0);

  // Function to update timesheet data
  const updateTimesheet = (updatedTimesheet) => {
    setName(updatedTimesheet.name);
    setDescription(updatedTimesheet.description);
  };

  // Function to add a line item to the list
  const addLineItem = (lineItem) => {
    setLineItems((prevLineItems) => [...prevLineItems, lineItem]);
  };

  return (
    <>
      {/* Render the page header */}
      <Header title="Timesheet" />

      {/* Navigation buttons */}
      <Grid xs={12} display="flex" justifyContent="center">
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </Button>
        <Button onClick={() => openModal("timesheet")}>Edit</Button>
      </Grid>

      {/* Timesheet details and line items */}
      <Grid
        container
        display="flex"
        justifyContent="center"
        style={{ margin: "24px" }}
      >
        <Card variant="outlined" style={{ padding: "0px 24px 24px" }}>
          <Grid container spacing={2} style={{ maxWidth: "800px" }}>
            {/* Timesheet details */}
            <Grid xs={12}>
              <h3>{name}</h3>
              <h5>Description</h5>
              <p>{description}</p>
            </Grid>

            {/* Create Line Item */}
            <Grid xs={12} display="flex" justifyContent="center">
              <Button onClick={() => openModal("lineItem")}>
                Create a Line Item
              </Button>
            </Grid>

            {/* Table */}
            <Grid xs={12} display="flex" justifyContent="center">
              <Table headers={headers} tableData={lineItems} />
            </Grid>

            {/* Totals and Rate */}
            <Grid xs={6} sm={3} display="flex" justifyContent="center">
              <p>Total Line Items: {lineItems.length}</p>
            </Grid>
            <Grid xs={6} sm={3} display="flex" justifyContent="center">
              <p>Total Time: {totalTime} min</p>
            </Grid>
            <Grid xs={6} sm={3} display="flex" justifyContent="center">
              <TextField
                label="Rate"
                type="number"
                variant="standard"
                inputProps={{
                  step: "0.01",
                  min: "0",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Grid>
            <Grid xs={6} sm={3} display="flex" justifyContent="center">
              <p>Total Cost: ${(rate * totalTime).toFixed(2)}</p>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* Modals */}
      <TimesheetModal
        open={modals.timesheet || false}
        onClose={() => closeModal("timesheet")}
        timesheet={{ id: id, name: name, description: description }}
        updateTimesheet={updateTimesheet}
      />
      <LineItemModal
        open={modals.lineItem || false}
        onClose={() => closeModal("lineItem")}
        lineItem={{ timesheetId: id }}
        addLineItem={addLineItem}
      />
    </>
  );
};

export default TimesheetShowPage;
