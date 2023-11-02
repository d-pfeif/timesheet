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
  const { id, name, description } = useLoaderData();
  const navigate = useNavigate();
  const { openModal, closeModal, modals } = useModal();

  const headers = [{ label: "Minutes" }, { label: "Date" }];

  const [lineItems, setLineItems] = useState([]);
  const [rate, setRate] = useState(0.0);

  useEffect(() => {
    // Fetch line items related to the timesheet when the component loads
    axios
      .get(`/line_items`, { params: { timesheet_id: id } })
      .then((response) => {
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
  }, [id, lineItems.length]);

  const totalTime = lineItems
    .map((x) => x.minutes)
    .reduce((pv, cv) => pv + cv, 0);

  const addLineItem = (lineItem) => {
    // Update the lineItems array with the new line item
    setLineItems((prevLineItems) => [...prevLineItems, lineItem]);
  };

  return (
    <>
      <Header title="Timesheet" />
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
      <Grid
        container
        display="flex"
        justifyContent="center"
        style={{ margin: "24px" }}
      >
        <Card variant="outlined" style={{ padding: "0px 24px 24px" }}>
          <Grid container spacing={2} style={{ maxWidth: "800px" }}>
            <Grid xs={12}>
              <h3>{name}</h3>
              <h5>Description</h5>
              <p>{description}</p>
            </Grid>

            <Grid xs={12} display="flex" justifyContent="center">
              <Button onClick={() => openModal("lineItem")}>
                Create a Line Item
              </Button>
            </Grid>
            <Grid xs={12} display="flex" justifyContent="center">
              <Table headers={headers} tableData={lineItems} />
            </Grid>
            <Grid xs={6} sm={3} display="flex" justifyContent="center">
              <p>Total Line Items: {lineItems.length}</p>
            </Grid>
            <Grid xs={6} sm={3} display="flex" justifyContent="center">
              <p>Total Time: {totalTime} min</p>
            </Grid>
            <Grid xs={6} sm={3} display="flex" justifyContent="center">
              {/* <p>Rate: 14.00</p> */}
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

      <TimesheetModal
        open={modals.timesheet || false}
        onClose={() => closeModal("timesheet")}
        timesheet={{ id: id, name: name, description: description }}
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
