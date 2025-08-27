"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { Task } from "@/types/Task";
import { api } from "../../lib/api";
import { FiArrowLeft, FiPlusCircle, FiCheck } from "react-icons/fi";
import { MdOutlineRocket } from "react-icons/md";

type Mode = "create" | "edit";

const COLORS = [
  "#ef4444",
  "#f59e0b",
  "#facc15",
  "#22c55e",
  "#38bdf8",
  "#3b82f6",
  "#a855f7",
  "#d946ef",
  "#a78b63",
];

export default function TaskForm({
  mode = "create",
  task,
}: {
  mode?: Mode;
  task?: Task;
}) {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [title, setTitle] = useState(task?.title ?? "");
  const [color, setColor] = useState(task?.color ?? COLORS[0]);
  const [busy, setBusy] = useState(false);

  const isEdit = mode === "edit";
  const buttonLabel = isEdit ? "Save Changes" : "Add Task";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || busy) return;

    setBusy(true);
    try {
      if (isEdit && task) {
        await api.put(`/tasks/${task.id}`, {
          title: title.trim(),
          color,
        });
      } else {
        await api.post(`/tasks`, {
          title: title.trim(),
          color,
          completed: false,
        });
      }

      await mutate("/tasks");
      router.back();
    } catch (err) {
      console.error("Task save failed", err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-black text-white relative">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex items-center gap-2">
          <MdOutlineRocket size={50} />
          <h1 className="text-5xl">
            <span className="text-blue-500">Todo</span>{" "}
            <span className="text-purple-500">App</span>
          </h1>
        </div>
      </div>
      <div className="bg-gray-800 w-full pt-24 pb-8 flex flex-col h-[95vh] items-center">
        <div>
          <div className="w-full text-white px-4 sm:px-6 md:px-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-300 hover:text-white py-4"
              aria-label="Back"
            >
              <FiArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </button>

            <form
              onSubmit={handleSubmit}
              className="max-w-xl space-y-6"
              aria-labelledby="task-form-title"
            >
              <div className="space-y-2">
                <label
                  id="task-form-title"
                  className="block text-sm font-semibold text-gray-200"
                >
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex. Brush your teeth"
                  className="w-full rounded-lg bg-gray-900 text-gray-100 placeholder-gray-400
                       outline-none ring-1 ring-transparent focus:ring-2 focus:ring-blue-500
                       px-4 py-3"
                />
              </div>
              <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-200">Color</div>
                <div className="flex gap-4 items-center">
                  {COLORS.map((c) => {
                    const selected = c === color;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className="relative h-9 w-9 rounded-full cursor-pointer"
                        aria-label={`Choose color ${c}`}
                      >
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: c }}
                        />
                        {selected && (
                          <span className="absolute inset-0 rounded-full ring-2 ring-white/80" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={busy || !title.trim()}
                className="w-full bg-[#1e6aa9] hover:bg-[#1b5e95] disabled:opacity-60
                     text-white rounded-lg px-5 py-3.5 font-semibold
                     flex items-center justify-center gap-2 cursor-pointer"
              >
                {buttonLabel}
                {isEdit ? <FiCheck /> : <FiPlusCircle />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
