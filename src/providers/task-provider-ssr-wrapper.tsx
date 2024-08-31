import { db } from '@/db/client';
import { tasks as tasksTable } from '@/db/schema';
import { TaskProvider } from '@/providers/task-provider';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// This is a server component wrapper to allow all the client components to be initially hydrated server-side
export const TaskProviderSSRWrapper = async ({ children }: Props) => {
  const tasks = db.select().from(tasksTable).all();

  return <TaskProvider initialTasks={tasks}>{children}</TaskProvider>;
};
