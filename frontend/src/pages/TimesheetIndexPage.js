import moment from "moment";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useModal } from "../store/ModalContext";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/";
import Header from "../layouts/Header";
import Table from "../components/core/Table";
import TimesheetModal from "../components/core/modals/TimesheetModal";

const TimesheetIndexPage = () => {
  // Initialize state and hooks
  const { openModal, closeModal, modals } = useModal();
  const navigate = useNavigate();
  const data = useLoaderData(); // Fetch data from route loader (see index.js)

  // Define headers for the table
  const headers = [
    { label: "ID", shrink: true }, // Shrinkable header
    { label: "Name" },
    { label: "Created At", shrink: true }, // Shrinkable header
  ];

  // Map data for the table
  const tableData = data.map((x) => ({
    id: x.id,
    name: x.name,
    createdAt: moment(x.created_at).format("MMMM Do YYYY"), // Format date
  }));

  return (
    <>
      {/* Page header */}
      <Header title="Your Timesheets" />

      {/* Page content */}
      <Grid container spacing={2} style={{ margin: "24px" }}>
        {/* Create a Timesheet button */}
        <Grid xs={12} display="flex" justifyContent="center">
          <Button onClick={() => openModal("timesheet")}>
            Create a Timesheet
          </Button>
        </Grid>

        {/* Table to display timesheets */}
        <Grid xs={12} display="flex" justifyContent="center">
          <Table
            headers={headers}
            tableData={tableData}
            handleRowClick={(data) => {
              navigate("/timesheets/" + data.id); // Handle row click navigation
            }}
          />
        </Grid>

        {/* Timesheet modal */}
        <TimesheetModal
          open={modals.timesheet || false}
          onClose={() => closeModal("timesheet")}
        />
      </Grid>
    </>
  );
};

export default TimesheetIndexPage;
