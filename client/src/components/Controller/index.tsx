import React from "react";
import Search from "./Search";
import Filter from "./Filter";
import uIStore from "../../stores/ui";
import taskStore from "../../stores/tasks";
import AddIcon from '@mui/icons-material/Add';
import "./styles.scss";

const Controller: React.FC = () => {
  const openModel = (): any => {
    taskStore.setSelectedTask(null);
    uIStore.openTaskModal();
  };
  return (
    <div className="tasks-controller">
      <div className="search-container">
        <Search />
      </div>
      <div className="filter-container">
        <Filter />
        <button
          onClick={(e) => {
            openModel();
          }}
        >
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default Controller;
