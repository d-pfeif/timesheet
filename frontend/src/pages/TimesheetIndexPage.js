import { useModal } from "../store/ModalContext";
import Header from "../layouts/Header";
import Button from "@mui/material/Button";
import TimesheetModal from "../components/core/modals/TimesheetModal";
import Table from "../components/core/Table";
import Grid from "@mui/material/Unstable_Grid2/";
import { useLoaderData, useNavigate } from "react-router-dom";

function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

const TimesheetIndexPage = () => {
  const { openModal, closeModal, modals } = useModal();
  const navigate = useNavigate();

  const headers = [{ label: "Name" }, { label: "Created At" }];
  const data = useLoaderData();
  const tableData = data.map((x) => ({
    name: x.name,
    createdAt: formatDate(x.created_at),
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
              navigate("/timesheets/123");
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
