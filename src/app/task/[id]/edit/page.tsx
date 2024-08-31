'use client';

import { TaskForm } from '@/components/task-form';
import { useTasks } from '@/providers/task-provider';
import { TaskFormInput, TaskFormSchema } from '@/schema/form-schema';
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

  // Convert initial values to match form schema
  const initialValues: TaskFormInput = {
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    isCompleted: task.isCompleted,
    priority: task.priority.toString() as '1' | '2' | '3', // Convert to string and assert type
  };

  const handleUpdateTask = (data: z.infer<typeof TaskFormSchema>) => {
    // Convert priority back to number for backend
    const updatedTask = {
      ...data,
      priority: Number(data.priority),
    };
    updateTask(taskId, updatedTask);
    router.push(`/task/${taskId}`);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <TaskForm
        taskId={taskId}
        initialValues={initialValues} // Pass string-based initial values for form
        mode="edit"
        onSubmit={handleUpdateTask} // Handle submission with type conversion
        onCancel={() => router.push(`/task/${taskId}`)}
      />
    </div>
  );
};

export default EditTaskPage;
