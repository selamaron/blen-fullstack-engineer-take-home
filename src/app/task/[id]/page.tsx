'use client';

import { useTasks } from '@/providers/task-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const TaskDetailsPage = ({ params }: { params: { id: string } }) => {
  const { tasks } = useTasks();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Find the task based on the id from the URL
  const taskId = parseInt(params.id, 10);
  const task = useMemo(() => tasks.find((t) => t.id === taskId), [tasks, taskId]);

  // Handle task loading state and redirection
  useEffect(() => {
    if (tasks.length === 0) return; // If tasks are not yet loaded, wait

    setIsLoading(false); // Tasks are loaded
    if (!task) {
      // Task not found after loading
      alert('Task not found!');
      router.push('/'); // Redirect to the tasks list page
    }
  }, [tasks, task, router]);

  if (isLoading) return <div>Loading...</div>; // Show a loading state while fetching

  if (!task) return null; // Return null if no task (this avoids rendering further)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-black">{task.title}</h1>
        <p className="mb-4 text-gray-600">{task.description}</p>
        <div className="mb-4 text-gray-700">
          <p>Due Date: {task.dueDate}</p>
          <p>Status: {task.isCompleted ? 'Completed' : 'Pending'}</p>
        </div>
        <div className="text-sm text-gray-500">
          <p>Created At: {task.createdAt}</p>
          <p>Updated At: {task.updatedAt}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => router.push('/')}
            className="mt-6 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
            Back to Tasks
          </button>
          <button
            onClick={() => router.push(`/task/${task.id}/edit`)}
            className="mt-6 rounded-lg bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600">
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
