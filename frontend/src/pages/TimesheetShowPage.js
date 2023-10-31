import Header from "../layouts/Header";
import { useLoaderData, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/";
import Table from "../components/core/Table";
import { Card, Button } from "@mui/material";
import TimesheetModal from "../components/core/modals/TimesheetModal";
import { useModal } from "../store/ModalContext";

const TimesheetShowPage = () => {
  const { id, name, description } = useLoaderData();
  const navigate = useNavigate();
  const { openModal, closeModal, modals } = useModal();

  const headers = [{ label: "Date" }, { label: "Minutes" }];

  const tableData = [];

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

            <Grid xs={4} display="flex" justifyContent="center">
              <p>Rate: 14.00</p>
            </Grid>
            <Grid xs={4} display="flex" justifyContent="center">
              <p>Total Time: 60 min</p>
            </Grid>
            <Grid xs={4} display="flex" justifyContent="center">
              <p>Total Cost: $200</p>
            </Grid>
            <Grid xs={12} display="flex" justifyContent="center">
              <Button>Create a Line Item</Button>
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
          </Grid>
        </Card>
      </Grid>

      <TimesheetModal
        open={modals.timesheet || false}
        onClose={() => closeModal("timesheet")}
        timesheet={{ id: id, name: name, description: description }}
      />
    </>
  );
};

export default TimesheetShowPage;
