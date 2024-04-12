// import React from 'react';
// import Task from '../Task';
// import { ITask } from '../../types';

// interface TaskListProps {
//   tasks: ITask[];
// }

// const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
//   return (
//     <ul>
//       {tasks.map((task) => (
//         <li key={task.id}>
//             <Task task={task} />
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default TaskList;
import React, { useState } from "react";
import Task from "../Task";
import { ITask } from "../../types";
import axios from "axios";

interface TaskListProps {
  tasks: ITask[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [currentTasks, setCurrentTasks] = useState(tasks);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string | number
  ) => {
    e.dataTransfer.setData("text/plain", id as any);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    const draggedTaskId = e.dataTransfer.getData("text/plain");
    const newTasks = [...currentTasks];
    const draggedTask = newTasks.find((task) => task.id === draggedTaskId);
    if (draggedTask) {
      newTasks.splice(newTasks.indexOf(draggedTask), 1);
      newTasks.splice(index, 0, draggedTask);
      setCurrentTasks(newTasks);
    }
    try {
      await axios.patch(`http://localhost:8000/tasks/${draggedTaskId}`, {
        order: index,
      });
      setCurrentTasks(newTasks);
    } catch (error) {
      console.error("Error updating task order:", error);
    }
  };

  return (
    <ul>
      {currentTasks
        .sort((a, b) => a.order - b.order)
        .map((task) => (
          <li key={task.id}>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, task.order)}
            >
              <Task task={task} />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default TaskList;
