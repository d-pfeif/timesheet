import Header from "../layouts/Header";
import Button from "@mui/material/Button";

const TimesheetIndexPage = () => {
  return (
    <>
      <Header title="Your Timesheets" />

      <Button>Create Timesheet</Button>

      <div>List of existing timesheets</div>
    </>
  );
};

export default TimesheetIndexPage;
