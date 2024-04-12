import { observable, action, computed, makeAutoObservable } from "mobx";
import { ITask } from "../types";
import { Tasks } from "../api/Resources/tasks";

class TaskStore {
  @observable tasks: ITask[] = [];
  @observable selectedTask: ITask | null = null;
  @observable filter: string = "all"; // Default filter
  @observable searchValue: string = ""; // Default search value

  constructor() {
    makeAutoObservable(this);
  }

  @computed get taskCount() {
    return this.tasks.length;
  }
  @computed get filteredTasks(): ITask[] {
    return this.tasks.filter((task) => {
      const lowerTitle = task.title.toLowerCase();
      const lowerDescription = task.description.toLowerCase();
      const lowerSearchValue = this.searchValue.toLowerCase();
      return (
        // Filter based on search value
        (lowerTitle.includes(lowerSearchValue) ||
          lowerDescription.includes(lowerSearchValue)) &&
        // Filter based on selected filter
        (this.filter === "all" ||
          (this.filter === "pending" && !task.completed) ||
          (this.filter === "completed" && task.completed))
      );
    });
  }

  private tasksApi = new Tasks(); // Assuming FetchApi is a service for making API calls

  @action async createTask(
    title: string,
    description: string,
    completed: boolean = false
  ) {
    try {
      const createdTask = await this.tasksApi.createTask({
        title,
        description,
        completed: false,
      });
      this.tasks.push(createdTask);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  async getTaskById(id: number | string) {
    const task = await this.tasksApi.getTaskById(id);
    return task;
  }

  @action async updateTask(id: number, updatedTask: Partial<ITask>) {
    try {
      await this.tasksApi.updateTask(id, updatedTask);
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  @action async deleteTask(id: number | string) {
    try {
      await this.tasksApi.deleteTask(id);
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  @action async toggleTaskCompletion(id: number | string) {
    const getTask = (id: number | string) =>
      this.tasks.find((task) => task.id === id);
    const task = getTask(id);
    if (task) {
      try {
        await this.tasksApi.updateTask(id, {
          title: task.title,
          description: task.description,
          completed: !task.completed,
        });
        task.completed = !task.completed;
      } catch (error) {
        console.error("Error toggling task completion:", error);
      }
    }
  }

  @action async fetchTasks() {
    try {
      const fetchedTasks = await this.tasksApi.getTasks();
      this.tasks = fetchedTasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
  @action
  setFilter(newFilter: string) {
    this.filter = newFilter;
  }

  @action
  setSearchValue(newValue: string) {
    this.searchValue = newValue;
  }
  @action
  setSelectedTask(task: ITask | null): void {
    this.selectedTask = task;
  }
}

const taskStore = new TaskStore();

export default taskStore;
