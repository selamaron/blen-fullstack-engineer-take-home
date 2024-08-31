'use client';

import { TaskCard } from '@/components/task-card';
import { useTasks } from '@/providers/task-provider';
import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';
import { TaskListActionMenu } from './task-list-action-menu';

// The useTasks hook is initially populated on the server
// So not strictly a client component, but it's functionally the same
export const TaskList = () => {
  const { tasks } = useTasks();

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
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
