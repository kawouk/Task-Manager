import { ITask } from "../../types";
import FetchApi from "../index";

export class Tasks extends FetchApi {
  async getTasks(): Promise<ITask[]> {
    const url = "tasks";
    return await this.get(url);
  }

  async createTask(data: any): Promise<ITask> {
    const url = "tasks";
    return await this.post(url, data);
  }

  async updateTask(id: number | string, data: any): Promise<void> {
    const url = `tasks/${id}`;
    return await this.put(url, data);
  }

  async deleteTask(id: number | string): Promise<void> {
    const url = `tasks/${id}`;
    return await this.delete(url);
  }
  async getTaskById(id: number | string): Promise<ITask> {
    const url = `tasks/${id}`;
    return await this.get(url);
  }
}
