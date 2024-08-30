'use client';

import { useTasks } from '@/providers/task-provider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddTaskPage = () => {
  const { addTask } = useTasks();
  const router = useRouter();

  // State to manage form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert('Please fill in all fields.');
      return;
    }

    // Add the new task
    addTask({
      title,
      description,
      dueDate,
      isCompleted,
    });

    // Redirect back to the tasks page or home page
    router.push('/');
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">Add New Task</h1>
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
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;
