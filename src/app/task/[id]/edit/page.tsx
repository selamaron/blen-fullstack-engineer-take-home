'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useTasks } from '@providers/task-provider';
import { Button } from '@ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Textarea } from '@ui/textarea';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const EditFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  isCompleted: z.boolean(),
});

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
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Edit Task</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
              />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">Due Date</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              {/* <Input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
                id="completed-checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              /> */}
              <Checkbox
                checked={isCompleted}
                onCheckedChange={(checked) =>
                  setIsCompleted(checked === 'indeterminate' ? false : checked)
                }
                id="completed-checkbox"
              />
              <Label htmlFor="completed-checkbox" className="text-sm">
                Mark as Completed
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push(`/task/${taskId}`)} type="button">
              Cancel
            </Button>
            <Button type="submit">Update Task</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditTaskPage;
