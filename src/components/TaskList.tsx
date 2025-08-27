import { Task } from "@/types/Task";
import React, { FC } from "react";
import { TaskCard } from "./TaskCard";
import useSWR from "swr";
import { fetchTasks } from "../../lib/api";

export interface TaskListProps {
  tasks: Task[];
}
export const TASKS_KEY = "/tasks";

export const TaskList: FC<TaskListProps> = () => {
    const { data: tasks, isLoading, error } = useSWR<Task[]>(TASKS_KEY, fetchTasks);
    
    if (isLoading) return <div className="p-4 text-gray-300">Loading…</div>;
    if (error) return <div className="p-4 text-red-400">Failed to load.</div>;
    if (!tasks?.length) return <div className="p-4 text-gray-400">No tasks yet.</div>;
    
    const completedTasks = tasks.reduce(
      (count, task) => count + (task.completed ? 1 : 0),
      0
    );
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center">
          <p>Tasks</p>
          <div className="rounded-full bg-gray-500 px-3 py-1 text-sm text-white ml-2">
            <p>{tasks.length}</p>
          </div>
        </div>
        <div className="flex items-center">
          <p>Completed</p>
          <div className="rounded-full bg-gray-500 px-3 py-1 text-sm text-white ml-2">
            <p>{completedTasks} of {tasks.length}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {tasks.map((task, i) => (
          <TaskCard key={i} task={task} />
        ))}
      </div>
    </>
  );
};

