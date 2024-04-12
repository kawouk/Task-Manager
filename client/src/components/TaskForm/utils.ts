import { ITask } from "../../types";

export const handleSaveClick = async (
  e: React.FormEvent<HTMLFormElement>,
  task: ITask | null,
  taskTitle: string,
  taskDescription: string,
  isChecked: boolean,
  navigate: Function,
  taskStore: any,
  uIStore: any
) => {
  e.preventDefault();
  const updatedTask = {
    title: taskTitle,
    description: taskDescription,
    completed: isChecked,
  };
  task
    ? await taskStore.updateTask(task.id, updatedTask)
    : await taskStore.createTask(
        updatedTask.title,
        updatedTask.description,
        updatedTask.completed
      );
  if (uIStore.modalOpen) {
    uIStore.closeModal();
  }
  navigate("/");
};
