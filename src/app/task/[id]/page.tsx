'use client';

import { PriorityBadge } from '@/components/priority-badge'; // Import the new PriorityBadge component
import { useTasks } from '@/providers/task-provider';
import {
  CalendarIcon,
  CheckCircledIcon,
  CircleIcon,
  ClockIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaFlag } from 'react-icons/fa';

const TaskDetailsPage = ({ params }: { params: { id: string } }) => {
  const { tasks } = useTasks();
  const router = useRouter();

  const taskId = parseInt(params.id, 10);
  const task = tasks.find((t) => t.id === taskId);

  useEffect(() => {
    if (tasks.length === 0) return;

    if (!task) {
      alert('Task not found!');
      router.push('/');
    }
  }, [tasks, task, router]);

  if (!task) return null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <Card className="border-muted w-full max-w-lg border shadow-lg">
        <CardHeader className="border-muted border-b p-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
              <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">{task.description}</p>
            </div>
            <Badge
              variant={task.isCompleted ? 'success' : 'destructive'}
              className="ml-auto flex h-min items-center space-x-1 rounded-full px-2 py-1">
              {task.isCompleted ? (
                <>
                  <CheckCircledIcon className="h-4 w-4" /> <span>Completed</span>
                </>
              ) : (
                <>
                  <CircleIcon className="h-4 w-4" /> <span>Pending</span>
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Task Due Date */}
          <div className="text-muted-foreground mb-4 flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            <p className="text-base">
              Due Date:{' '}
              {new Date(task.dueDate).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          {/* Task Priority */}
          <div className="text-muted-foreground mb-4 flex items-center">
            <FaFlag className="mr-2 h-5 w-5" />
            <p className="mr-2 text-base">Priority:</p>
            <PriorityBadge priority={task.priority} />
          </div>
          {/* Divider */}
          <hr className="border-muted my-4" />
          {/* Task Metadata */}
          <div className="text-muted-foreground grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-4 w-4" />
              <p>
                <strong>Created At:</strong>{' '}
                {new Date(task.createdAt).toLocaleString(undefined, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-4 w-4" />
              <p>
                <strong>Updated At:</strong>{' '}
                {new Date(task.updatedAt).toLocaleString(undefined, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-muted flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => router.push('/')}>
            &larr;&nbsp;&nbsp;Back to Tasks
          </Button>
          <Button
            onClick={() => router.push(`/task/${task.id}/edit`)}
            className="flex items-center space-x-2">
            <Pencil1Icon className="h-4 w-4" />
            <span>Edit Task</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaskDetailsPage;
