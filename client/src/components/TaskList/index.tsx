import React, { useEffect } from "react";
import Task from "../Task";
import { ITask } from "../../types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import taskStore from "../../stores/tasks";
import { observer } from "mobx-react";

interface TaskListProps {
  tasks: ITask[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const newTasks = Array.from(tasks);

    const [removed] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, removed);

    for (
      let i = Math.min(source.index, destination.index);
      i <= Math.max(source.index, destination.index);
      i++
    ) {
      await taskStore.updateTaskOrder(newTasks[i].id, i);
    }
    taskStore.setTasks(newTasks);
  };
  const sortByOrder = (arr: ITask[]) => {
    // Sort the array of objects based on the 'order' property
    const newarr = arr.sort((a, b) => a.order - b.order);
    taskStore.setTasks(newarr);
  };
  useEffect(() => {
    sortByOrder(tasks)
  },[]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id as string}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={task} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default observer(TaskList);
