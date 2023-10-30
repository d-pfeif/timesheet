import { useModal } from "../store/ModalContext";
import Header from "../layouts/Header";
import Button from "@mui/material/Button";
import TimesheetModal from "../components/core/modals/TimesheetModal";

const TimesheetIndexPage = () => {
  const { openModal } = useModal();

  return (
    <>
      <Header title="Your Timesheets" />

      <Button onClick={openModal}>Open Timesheet Modal</Button>
      <TimesheetModal />

      <div>List of existing timesheets</div>
    </>
  );
};

export default TimesheetIndexPage;
