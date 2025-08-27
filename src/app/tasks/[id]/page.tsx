"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { fetchTasks } from "../../../../lib/api";
import { Task } from "@/types/Task";

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const { data: tasks } = useSWR<Task[]>("/tasks", fetchTasks);
  const task = tasks?.find((t) => String(t.id) === id);

  if (!task) return <div className="p-6 text-gray-300">Loading…</div>;
  return <TaskForm mode="edit" task={task} />;
}
