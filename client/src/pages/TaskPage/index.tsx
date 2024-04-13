import React, { useEffect, useState } from "react";
import TaskForm from "../../components/TaskForm";
import { useParams } from "react-router-dom";
import taskStore from "../../stores/tasks";
import { ITask } from "../../types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./styles.scss";

const Controller: React.FC = () => {
  const [task, setTask] = useState<ITask>();
  const { id } = useParams();
  const getTask = async () => {
    if (id) {
      const taskById = await taskStore.getTaskById(id);
      setTask(taskById);
    }
  };
  const goBack = () => {
    window.history.back();
  };
  useEffect(() => {
    if (id) {
      getTask();
    }
  }, []);
  return (
    <div className="task-page page">
      <h1>
        <span
          onClick={(e) => {
            goBack();
          }}
        >
          <ArrowBackIosIcon />
        </span>
        Task Details
      </h1>
      {task && <TaskForm task={task} />}
    </div>
  );
};

export default Controller;
