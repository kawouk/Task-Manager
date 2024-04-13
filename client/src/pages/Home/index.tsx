import React, { useEffect } from "react";
import taskStore from "../..//stores/tasks";
import TaskList from "../../components/TaskList";
import Controller from "../../components/Controller";
import { observer } from "mobx-react";
import TaskModal from "../../components/TaskModal";
import "./styles.scss";

const Home: React.FC = () => {
  const getTasks = async () => {
    await taskStore.fetchTasks();
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className="home page">
      <h1>Todo List</h1>
      <Controller />

      {taskStore.filteredTasks.length > 0 && (
        <TaskList tasks={taskStore.filteredTasks} />
      )}
      <TaskModal />
    </div>
  );
};
export default observer(Home);
