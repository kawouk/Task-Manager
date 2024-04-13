import React, { useState } from "react";
import { TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import taskStore from "../../stores/tasks";
import { ITaskProps } from "./type";
import uIStore from "../../stores/ui";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const TaskForm: React.FC<ITaskProps> = ({ task }) => {
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState<string>(task?.title || "");
  const [taskDescription, setTaskDescription] = useState<string>(
    task?.description || ""
  );
  const [isChecked, setIsChecked] = useState<boolean>(task?.completed || false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const submitTask = () => {
    const updatedTask = {
      title: taskTitle,
      description: taskDescription,
      completed: isChecked,
    };
    task
      ?  taskStore.updateTask(task.id, updatedTask)
      :  taskStore.createTask(
          updatedTask.title,
          updatedTask.description,
          updatedTask.completed
        );
    if (uIStore.modalOpen) {
      uIStore.closeModal();
    }
    navigate("/");
  };
  return (
    <div>
      <TextField
        label="Task Title"
        value={taskTitle}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Task Description"
        value={taskDescription}
        onChange={handleDescriptionChange}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      {task && (
        <FormControlLabel
          control={
            <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          }
          label="Completed"
        />
      )}
      <div className="action-btn-container">
        {uIStore.openModal && (
          <Button
            variant="contained"
            color="warning"
            onClick={(e) => uIStore.closeModal()}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => submitTask()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default TaskForm;
