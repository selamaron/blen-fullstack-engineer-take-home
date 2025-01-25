import Welcome from '@/components/welcome';
import { tasks } from "@/db/schema";
import { db } from "@/db/client";
import Link from "next/link";

export default async function TaskListPage() {
  const taskList = await db.select().from(tasks);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Task List</h1>
      <ul>
        {taskList.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 border-b">
            <span>{task.title} (Due: {task.dueDate})</span>
            <div>
              <Link href={`/${task.id}/edit`} className="mr-2">Edit</Link>
              <button
                onClick={async () => {
                  await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
                  window.location.reload();
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/add" className="btn">Add Task</Link>
    </div>
  );
}

