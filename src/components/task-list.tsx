'use client';

import { TaskCard } from '@/components/task-card';
import { useTasks } from '@/providers/task-provider';
import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';
import { RefreshButton } from './refresh-button';
import { TaskListActionMenu } from './task-list-action-menu';
import { TaskListControls } from './task-list-controls';

// The useTasks hook is initially populated on the server, so it's still instant
export const TaskList = () => {
  const { tasks, sortOption, filterOption } = useTasks();

  // Filter tasks based on the selected filter option
  const filteredTasks = tasks.filter((task) => {
    if (filterOption === 'completed') return task.isCompleted;
    if (filterOption === 'pending') return !task.isCompleted;
    return true; // 'all'
  });

  // Sort tasks based on the selected sort option and direction
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOption === 'none') return 0; // No sorting applied

    let comparison = 0;

    if (sortOption === 'title-asc') comparison = a.title.localeCompare(b.title);
    else if (sortOption === 'title-desc') comparison = b.title.localeCompare(a.title);
    else if (sortOption === 'dueDate-asc')
      comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    else if (sortOption === 'dueDate-desc')
      comparison = new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    else if (sortOption === 'priority-asc') comparison = a.priority - b.priority;
    else if (sortOption === 'priority-desc') comparison = b.priority - a.priority;
    else if (sortOption === 'status-asc')
      comparison = Number(a.isCompleted) - Number(b.isCompleted);
    else if (sortOption === 'status-desc')
      comparison = Number(b.isCompleted) - Number(a.isCompleted);

    return comparison;
  });

  return (
    <div className="flex w-full flex-1 flex-col gap-4 p-4">
      <div className="flex items-center px-2">
        <h1 className="mr-2 text-2xl">Tasks</h1>
        <RefreshButton className="mr-auto" />
        <TaskListControls />
        <TaskListActionMenu />
        {/* Add Task Button */}
        <Link href="/add">
          <FaPlusCircle className="h-6 w-6" />
        </Link>
      </div>
      {/* Render Sorted and Filtered Tasks */}
      {sortedTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
