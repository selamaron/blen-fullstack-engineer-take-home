'use client';

import { type NewTask, type Task } from '@/db/schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';

interface TaskProviderContextType {
  tasks: Task[];
  addTask: (newTask: NewTask) => void;
  updateTask: (id: number, updatedTask: Partial<NewTask>) => void;
  deleteTask: (id: number) => void; // Add deleteTask to the interface
  openTasks: number[];
  setOpenTasks: React.Dispatch<React.SetStateAction<number[]>>;
  expandAllTasks: () => void;
  collapseAllTasks: () => void;
}

const TaskProviderContext = createContext<TaskProviderContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskProviderContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
  initialTasks?: Task[];
}

export const TaskProvider = ({ children, initialTasks }: Props) => {
  const queryClient = useQueryClient();
  const [openTasks, setOpenTasks] = useState<number[]>([]);

  const expandAllTasks = () => {
    setOpenTasks((prevOpenTasks) => [...prevOpenTasks, ...tasks.map((task) => task.id)]);
  };

  const collapseAllTasks = () => {
    setOpenTasks([]);
  };

  // Fetch tasks using TanStack Query
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      return res.json();
    },
    initialData: initialTasks,
  });

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

  const addTask = (newTask: NewTask) => {
    addTaskMutation.mutate(newTask);
  };

  const updateTask = (id: number, updatedTask: Partial<NewTask>) => {
    updateTaskMutation.mutate({ id, updatedTask });
  };

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
        expandAllTasks,
        collapseAllTasks,
      }}>
      {children}
    </TaskProviderContext.Provider>
  );
};
