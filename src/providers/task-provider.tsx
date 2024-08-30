'use client';

import { tasks as _tasks, NewTask, Task } from '@/constants/tasks';
import { createContext, useContext, useEffect, useState } from 'react';

interface TaskProviderValue {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  openTasks: number[];
  setOpenTasks: React.Dispatch<React.SetStateAction<number[]>>;
  addTask: (newTask: NewTask) => void; // New function to add tasks
}

const TaskProviderContext = createContext<TaskProviderValue | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskProviderContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const TaskProvider = ({ children }: Props) => {
  const [openTasks, setOpenTasks] = useState<number[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(_tasks);
  }, []);

  // Function to add a new task
  const addTask = (newTask: NewTask) => {
    // Generate a new unique ID (incrementing from the max existing ID)
    const newId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
    const createdAt = new Date().toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD' format
    const updatedAt = createdAt;

    // Create a new task object
    const taskToAdd: Task = {
      id: newId,
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      isCompleted: newTask.isCompleted,
      createdAt,
      updatedAt,
    };

    // Update the tasks state with the new task
    setTasks((prevTasks) => [...prevTasks, taskToAdd]);
  };

  return (
    <TaskProviderContext.Provider value={{ tasks, setTasks, openTasks, setOpenTasks, addTask }}>
      {children}
    </TaskProviderContext.Provider>
  );
};
