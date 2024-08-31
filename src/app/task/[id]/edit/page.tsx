'use client';

import { useTasks } from '@providers/task-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditTaskPage = ({ params }: { params: { id: string } }) => {
  const { tasks, updateTask } = useTasks(); // Update the useTasks to include an updateTask function
  const router = useRouter();
  const taskId = parseInt(params.id, 10);

  // Find the task to edit
  const task = tasks.find((t) => t.id === taskId);

  // State to manage form inputs
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted || false);

  // Update state when task data is available
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setIsCompleted(task.isCompleted);
    }
  }, [task]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert('Please fill in all fields.');
      return;
    }

    // Update the task
    updateTask(taskId, {
      title,
      description,
      dueDate,
      isCompleted,
    });

    // Redirect back to the task details page
    router.push(`/task/${taskId}`);
  };

  // If the task is not found, show a message
  if (!task) return <div>Task not found!</div>;

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold text-black">Edit Task</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring focus:ring-blue-200"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              id="completed-checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="completed-checkbox" className="text-sm text-gray-700">
              Mark as Completed
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => router.push(`/task/${taskId}`)}
              type="button"
              className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskPage;
