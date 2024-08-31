'use client';

import { TaskCard } from '@/components/task-card';
import { useTasks } from '@/providers/task-provider';
import ChecklistIcon from '@icons/checklist-icon.svg';
import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';

const Page = () => {
  const { tasks } = useTasks();

  return (
    <div className="flex h-full flex-col">
      <div className="bg-card flex w-full items-center gap-2 border-b px-4 py-4 text-xl">
        <ChecklistIcon className="h-6 w-6 fill-white" />
        <h2>TaskMaster</h2>
      </div>
      <div className="flex w-full flex-1">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between px-2">
            <h1 className="text-2xl">Tasks</h1>
            <Link href="/add">
              <FaPlusCircle className="h-6 w-6" />
            </Link>
          </div>

          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
