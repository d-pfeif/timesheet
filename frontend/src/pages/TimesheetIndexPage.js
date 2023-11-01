import moment from "moment";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useModal } from "../store/ModalContext";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/";
import Header from "../layouts/Header";
import Table from "../components/core/Table";
import TimesheetModal from "../components/core/modals/TimesheetModal";

const TimesheetIndexPage = () => {
  const { openModal, closeModal, modals } = useModal();
  const navigate = useNavigate();

  const headers = [
    { label: "ID", shrink: true },
    { label: "Name" },
    { label: "Created At", shrink: true },
  ];

  const data = useLoaderData();
  const tableData = data.map((x) => ({
    id: x.id,
    name: x.name,
    createdAt: moment(x.created_at).format("MMMM Do YYYY"),
  }));

  return (
    <>
      <Header title="Your Timesheets" />
      <Grid container spacing={2} style={{ margin: "24px" }}>
        <Grid xs={12} display="flex" justifyContent="center">
          <Button onClick={() => openModal("timesheet")}>
            Create a Timesheet
          </Button>
        </Grid>
        <Grid xs={12} display="flex" justifyContent="center">
          <Table
            headers={headers}
            tableData={tableData}
            handleRowClick={(data) => {
              navigate("/timesheets/" + data.id);
            }}
          />
        </Grid>

        <TimesheetModal
          open={modals.timesheet || false}
          onClose={() => closeModal("timesheet")}
        />
      </Grid>
    </>
  );
};

export default TimesheetIndexPage;
