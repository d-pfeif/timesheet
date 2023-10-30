import { useModal } from "../store/ModalContext";
import Header from "../layouts/Header";
import Button from "@mui/material/Button";
import TimesheetModal from "../components/core/modals/TimesheetModal";

const TimesheetIndexPage = () => {
  const { openModal, closeModal, modals } = useModal();

  return (
    <>
      <Header title="Your Timesheets" />

      <Button onClick={() => openModal("timesheet")}>
        Open Timesheet Modal
      </Button>
      <Button onClick={() => openModal("another")}>Open Another Modal</Button>
      <TimesheetModal
        open={modals.timesheet || false}
        onClose={() => closeModal("timesheet")}
      />

      <div>List of existing timesheets</div>
    </>
  );
};

export default TimesheetIndexPage;
