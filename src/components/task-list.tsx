import { TaskCard } from '@/components/task-card'; // Import the TaskCard client component
import { db } from '@/db/client';
import { tasks as tasksTable } from '@/db/schema';
import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';
import { TaskListActionMenu } from './task-list-action-menu';

// This is a server component
export default async function TaskList() {
  // Fetch tasks directly from the database server-side
  const tasks = db.select().from(tasksTable).all();

  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4">
      <div className="flex items-center px-2">
        <h1 className="mr-auto text-2xl">Tasks</h1>
        <TaskListActionMenu />
        <Link href="/add">
          <FaPlusCircle className="h-6 w-6" />
        </Link>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} /> // Render client component for each task
      ))}
    </div>
  );
}
