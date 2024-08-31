'use client';

import { TaskForm } from '@/components/task-form';
import { useTasks } from '@/providers/task-provider';
import { EditFormSchema } from '@/schema/form-schema';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const AddTaskPage = () => {
  const { addTask } = useTasks();
  const router = useRouter();

  const handleAddTask = (data: z.infer<typeof EditFormSchema>) => {
    addTask(data);
    router.push('/');
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <TaskForm mode="create" onSubmit={handleAddTask} onCancel={() => router.push('/')} />
    </div>
  );
};

export default AddTaskPage;
