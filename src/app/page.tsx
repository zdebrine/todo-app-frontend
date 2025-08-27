"use client";
import { TaskList } from "@/components/TaskList";
import { Task } from "@/types/Task";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineRocket } from "react-icons/md";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  async function fetchTasks() {
    try {
      const response = await axios.get<Task[]>("http://localhost:4000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching Tasks:", error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-black text-white relative">
      <header className="flex flex-col items-center justify-center py-12">
        <div className="flex items-center gap-2">
          <MdOutlineRocket size={50} />
          <h1 className="text-5xl">
            <span className="text-blue-500">Todo</span>{" "}
            <span className="text-purple-500">App</span>
          </h1>
        </div>
        <a
          href="/tasks/new"
          className="w-3xl bg-[#1e6aa9] hover:bg-[#1b5e95] disabled:opacity-60
                     text-white rounded-lg px-5 py-3.5 font-semibold
                     flex items-center justify-center gap-2 mt-16"
        >
          Add Task
        </a>
      </header>

      <main className="bg-gray-800 w-full pt-24 mt-[-72] pb-8">
        <div className="max-w-3xl mx-auto px-4">
          <TaskList tasks={tasks} />
        </div>
      </main>
    </div>
  );
}
