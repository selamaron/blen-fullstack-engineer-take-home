'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';

import { type NewTask, type Task } from '@/db/schema';

interface TaskProviderValue {
  tasks: Task[];
  addTask: (newTask: NewTask) => void;
  updateTask: (id: number, updatedTask: Partial<NewTask>) => void;
  deleteTask: (id: number) => void; // Add deleteTask to the interface
  openTasks: number[];
  setOpenTasks: React.Dispatch<React.SetStateAction<number[]>>;
}

const TaskProviderContext = createContext<TaskProviderValue | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskProviderContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const TaskProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const [openTasks, setOpenTasks] = useState<number[]>([]);

  // Fetch tasks using TanStack Query
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      return res.json();
    },
  });

  // Mutation to add a new task
  const addTaskMutation = useMutation({
    mutationFn: async (newTask: NewTask) => {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) throw new Error('Failed to add task');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Mutation to update an existing task
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updatedTask }: { id: number; updatedTask: Partial<NewTask> }) => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) throw new Error('Failed to update task');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Mutation to delete an existing task
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Refetch tasks after deletion
    },
  });

  // Function to add a new task
  const addTask = (newTask: NewTask) => {
    addTaskMutation.mutate(newTask);
  };

  // Function to update a task
  const updateTask = (id: number, updatedTask: Partial<NewTask>) => {
    updateTaskMutation.mutate({ id, updatedTask });
  };

  // Function to delete a task
  const deleteTask = (id: number) => {
    deleteTaskMutation.mutate(id);
  };

  return (
    <TaskProviderContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        openTasks,
        setOpenTasks,
      }}>
      {children}
    </TaskProviderContext.Provider>
  );
};
