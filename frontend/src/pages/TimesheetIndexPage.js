import { useModal } from "../store/ModalContext";
import Header from "../layouts/Header";
import Button from "@mui/material/Button";
import TimesheetModal from "../components/core/modals/TimesheetModal";
import Table from "../components/core/Table";
import Grid from "@mui/material/Unstable_Grid2/";

const TimesheetIndexPage = () => {
  const { openModal, closeModal, modals } = useModal();

  const headers = [{ label: "Name" }, { label: "Created At" }];
  const tableData = [
    {
      name: "My Timesheet",
      created_at: "2023-10-23",
    },
  ];

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
          <Table headers={headers} tableData={tableData} />
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
