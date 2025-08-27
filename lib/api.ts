import axios from "axios";
import { Task } from "@/types/Task"

export const api = axios.create({ baseURL: "http://localhost:4000" });

export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await api.get<Task[]>("/tasks");
  return data;
};

export const completeTask = (id: number) =>
  api.put(`/tasks/${id}`, { completed: true });

export const deleteTaskById = (id: number) =>
  api.delete(`/tasks/${id}`);
