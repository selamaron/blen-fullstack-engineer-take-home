'use client';

import { useTasks } from '@/providers/task-provider';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/card';
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
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1.5">
              <CardTitle>{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </div>
            <Badge variant={task.isCompleted ? 'success' : 'destructive'} className="h-min">
              {task.isCompleted ? 'Completed' : 'Pending'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-gray-300">
            <p>Due Date: {task.dueDate}</p>
          </div>
          <div className="text-sm text-gray-200">
            <p>Created At: {task.createdAt}</p>
            <p>Updated At: {task.updatedAt}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/')}>
            Back to Tasks
          </Button>
          <Button onClick={() => router.push(`/task/${task.id}/edit`)}>Edit Task</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaskDetailsPage;
