import { db } from '@/db/client';
import { tasks as tasksTable } from '@/db/schema';
import { TaskProvider } from '@/providers/task-provider'; // Import TaskProvider
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// This is a server component to allow all the client components to be effectively server components
export const TaskProviderSSRWrapper = async ({ children }: Props) => {
  const tasks = db.select().from(tasksTable).all();

  return <TaskProvider initialTasks={tasks}>{children}</TaskProvider>;
};
