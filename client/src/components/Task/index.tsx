import React, { useState } from "react";
import { ITask } from "../../types";
import uIStore from "../../stores/ui";
import taskStore from "../../stores/tasks";
import { Link } from "react-router-dom";
import "./styles.scss";
import { Checkbox } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const { title, description, completed } = task;
  const [completedTask, setCompleted] = useState<boolean>(completed);
  let className = "status";

  // Conditionally add additional classes based on props
  if (completed) {
    className += " active";
  }

  const editTask = () => {
    taskStore.setSelectedTask(task);
    uIStore.openTaskModal();
  };
  const deleteTask = async () => {
    await taskStore.deleteTask(task.id);
  };
  const completeTask = async () => {
    await taskStore.toggleTaskCompletion(task.id);
    setCompleted(!completedTask);
  };

  return (
    <div className="task-card">
      <div className="task-info">
        <Link to={`/task/${task.id}`}>
          <h3>{title}</h3>
        </Link>

        <div className="desc"> {description}</div>
      </div>

      <div className={className}>
        {" "}
        <span>•</span> {className.includes("active") ? "done" : "pending"}
      </div>
      <div className="task-btns">
        <button
          onClick={(e) => {
            editTask();
          }}
        >
          <ModeEditOutlinedIcon />
        </button>
        <button
          className="delete-btn"
          onClick={(e) => {
            deleteTask();
          }}
        >
          <DeleteOutlineOutlinedIcon />
        </button>

        <Checkbox checked={completedTask} onChange={completeTask} />
      </div>
    </div>
  );
};
export default Task;
