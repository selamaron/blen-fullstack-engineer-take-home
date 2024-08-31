'use client';

import { TaskForm } from '@/components/task-form';
import { useTasks } from '@/providers/task-provider';
import { TaskFormSchema } from '@/schema/form-schema';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const AddTaskPage = () => {
  const { addTask } = useTasks();
  const router = useRouter();

  const handleAddTask = (data: z.infer<typeof TaskFormSchema>) => {
    // Convert priority back to number for backend
    const updatedTask = {
      ...data,
      priority: Number(data.priority),
    };
    addTask(updatedTask);
    router.push('/');
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <TaskForm mode="create" onSubmit={handleAddTask} onCancel={() => router.push('/')} />
    </div>
  );
};

export default AddTaskPage;
