import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import uIStore from "../../stores/ui";
import { observer } from "mobx-react";
import TaskForm from "../TaskForm";
import taskStore from "../../stores/tasks";

const FormDialog: React.FC = () => {
  const handleClose = () => {
    uIStore.closeModal();
  };

  return (
    <React.Fragment>
      <Dialog open={uIStore.openModal} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TaskForm task={taskStore.selectedTask} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default observer(FormDialog);
