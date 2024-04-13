import { ITask } from "../../types";
import FetchApi from "../index";

export class Tasks extends FetchApi {
  async getTasks(): Promise<ITask[]> {
    const url = "ITMY";
    return await this.get(url);
  }

  async createTask(data: any): Promise<ITask> {
    const url = "ITMY";
    return await this.post(url, data);
  }

  async updateTask(id: number | string, data: any): Promise<void> {
    const url = `ITMY/${id}`;
    return await this.put(url, data);
  }
  async updateTaskOrder(id: number | string, data: any): Promise<void> {
    const url = `ITMY/${id}`;
    return await this.patch(url, data);
  }


  async deleteTask(id: number | string): Promise<void> {
    const url = `ITMY/${id}`;
    return await this.delete(url);
  }
  async getTaskById(id: number | string): Promise<ITask> {
    const url = `ITMY/${id}`;
    return await this.get(url);
  }
}
