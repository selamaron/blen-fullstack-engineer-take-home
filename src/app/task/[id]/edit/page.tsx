'use client';

import { TaskForm } from '@/components/task-form';
import { useTasks } from '@/providers/task-provider';
import { EditFormSchema } from '@/schema/form-schema';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const EditTaskPage = ({ params }: { params: { id: string } }) => {
  const { tasks, updateTask } = useTasks();
  const router = useRouter();
  const taskId = parseInt(params.id, 10);

  // Find the task to edit
  const task = tasks.find((t) => t.id === taskId);

  // If the task is not found, show a message
  if (!task) return <div>Task not found!</div>;

  const handleUpdateTask = (data: z.infer<typeof EditFormSchema>) => {
    updateTask(taskId, data);
    router.push(`/task/${taskId}`);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <TaskForm
        taskId={taskId}
        initialValues={{
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          isCompleted: task.isCompleted,
        }}
        mode="edit"
        onSubmit={handleUpdateTask}
        onCancel={() => router.push(`/task/${taskId}`)}
      />
    </div>
  );
};

export default EditTaskPage;
