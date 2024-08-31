'use client';

import { Toaster } from '@/components/ui/sonner';
import { type NewTask, type Task } from '@/db/schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

// Define types for sort and filter options
export type SortOption =
  | 'none'
  | 'title-asc'
  | 'title-desc'
  | 'dueDate-asc'
  | 'dueDate-desc'
  | 'priority-asc'
  | 'priority-desc'
  | 'status-asc'
  | 'status-desc';

export type FilterOption = 'all' | 'completed' | 'pending';

interface TaskProviderContextType {
  tasks: Task[];
  addTask: (newTask: NewTask) => void;
  updateTask: (id: number, updatedTask: Partial<NewTask>) => void;
  deleteTask: (id: number) => void;
  openTasks: number[];
  setOpenTasks: React.Dispatch<React.SetStateAction<number[]>>;
  expandAllTasks: () => void;
  collapseAllTasks: () => void;
  refreshTasks: () => void;
  isFetchingTasks: boolean;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  filterOption: FilterOption;
  setFilterOption: (option: FilterOption) => void;
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
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [filterOption, setFilterOption] = useState<FilterOption>('all');

  const expandAllTasks = () => {
    setOpenTasks((prevOpenTasks) => [...prevOpenTasks, ...tasks.map((task) => task.id)]);
  };

  const collapseAllTasks = () => {
    setOpenTasks([]);
  };

  // Fetch tasks using TanStack Query
  const { data: tasks = [], isFetching } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      return res.json();
    },
    initialData: initialTasks,
  });

  const refreshTasks = () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  };

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
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      if (previousTasks) {
        queryClient.setQueryData(['tasks'], [...previousTasks, { ...newTask, id: Date.now() }]);
      }

      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      toast.error('Failed to add task. Please try again.');
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      toast.success('Task added successfully!');
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
    onMutate: async ({ id, updatedTask }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      if (previousTasks) {
        queryClient.setQueryData(
          ['tasks'],
          previousTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
        );
      }

      return { previousTasks };
    },
    onError: (err, { id, updatedTask }, context) => {
      toast.error('Failed to update task. Please try again.');
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      toast.success('Task updated successfully!');
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
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      if (previousTasks) {
        queryClient.setQueryData(
          ['tasks'],
          previousTasks.filter((task) => task.id !== id)
        );
      }

      return { previousTasks };
    },
    onError: (err, id, context) => {
      toast.error('Failed to delete task. Please try again.');
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      toast.success('Task deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
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
        refreshTasks,
        isFetchingTasks: isFetching,
        sortOption,
        setSortOption,
        filterOption,
        setFilterOption,
      }}>
      {children}
      <Toaster />
    </TaskProviderContext.Provider>
  );
};
