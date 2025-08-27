"use client";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import { completeTask, deleteTaskById } from "../../lib/api";
import { Task } from "@/types/Task";
import { FiTrash2 } from "react-icons/fi";
import { TASKS_KEY } from "./TaskList";
import { useRouter } from "next/navigation";

export const TaskCard: FC<{ task: Task }> = ({ task }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [busy, setBusy] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const onComplete = async () => {
    if (busy || task.completed) return;
    setBusy(true);

    await mutate(
      TASKS_KEY,
      async () => {
        await completeTask(task.id);
        return undefined;
      },
      {
        optimisticData: (current?: Task[]) =>
          current?.map((t) =>
            t.id === task.id ? { ...t, completed: true } : t
          ) ?? [],
        rollbackOnError: true,
        revalidate: true,
      }
    );

    setBusy(false);
  };

  const onDelete = async () => {
    if (busy) return;
    setBusy(true);

    await mutate(
      TASKS_KEY,
      async () => {
        await deleteTaskById(task.id);
        return undefined;
      },
      {
        optimisticData: (current?: Task[]) =>
          current?.filter((t) => t.id !== task.id) ?? [],
        rollbackOnError: true,
        revalidate: true,
      }
    );

    setBusy(false);
  };

  const completed = task.completed;

  return (
    <div className="mb-4 bg-gray-800 text-gray-100 rounded-2xl px-4 py-3 shadow-md border border-gray-700 flex items-start justify-between gap-3">
      <div className="flex center">
        <button
          style={!completed ? { borderColor: task.color } : undefined}
          onClick={onComplete}
          disabled={busy || completed}
          aria-label={completed ? "Completed" : "Mark complete"}
          className={`relative mt-0.5 h-5 w-5 rounded-full border transition
        ${
          completed
            ? "border-blue-500 bg-blue-500"
            : `border-blue-500 hover:border-blue-400 cursor-pointer`
        }
          disabled:opacity-60`}
        />
        <div
          onClick={() => router.push(`/tasks/${task.id}`)}
          className="cursor-pointer ml-8"
        >
          <p
            className={`flex-1 text-sm md:text-base leading-relaxed ${
              completed ? "line-through text-gray-400" : "text-gray-200"
            }`}
          >
            {task.title}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {confirmingDelete && (
          <button
            onClick={onDelete}
            disabled={busy}
            className="cursor-pointer px-3 py-1 rounded-md bg-gray-700 text-gray-100 hover:bg-gray-600 transition disabled:opacity-60"
          >
            Are you sure?
          </button>
        )}

        <button
          onClick={() => setConfirmingDelete((v) => !v)}
          disabled={busy}
          aria-label="Delete task"
          className="cursor-pointer shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition disabled:opacity-60"
        >
          <FiTrash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
