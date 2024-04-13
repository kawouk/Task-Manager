import React, { useEffect, useState } from "react";
import taskStore from "../..//stores/tasks";
import TaskList from "../../components/TaskList";
import Controller from "../../components/Controller";
import { observer } from "mobx-react";
import TaskModal from "../../components/TaskModal";
import Loader from "../../components/Loader";
import "./styles.scss";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const getTasks = async () => {
    await taskStore.fetchTasks();
  };
  useEffect(() => {
    getTasks();
    setLoading(false);
  }, []);
  return (
    <div className="home page">
      <h1>Todo List</h1>
      <Controller />
      {loading && <Loader />}
      {taskStore.filteredTasks.length > 0 && !loading && (
        <TaskList tasks={taskStore.filteredTasks} />
      )}
      <TaskModal />
    </div>
  );
};
export default observer(Home);
