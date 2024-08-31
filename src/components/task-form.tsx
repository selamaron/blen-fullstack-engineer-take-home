'use client';

import { cn } from '@/lib/utils';
import { useTasks } from '@/providers/task-provider';
import { TaskFormSchema } from '@/schema/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@ui/alert-dialog';
import { Button } from '@ui/button';
import { Calendar } from '@ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { Checkbox } from '@ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { Textarea } from '@ui/textarea';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Reusable form component for both create and edit tasks
type TaskFormProps = {
  initialValues?: z.infer<typeof TaskFormSchema>;
  onSubmit: (data: z.infer<typeof TaskFormSchema>) => void;
  mode: 'create' | 'edit';
  onCancel: () => void;
  taskId?: number;
};

export function TaskForm({ initialValues, onSubmit, mode, onCancel, taskId }: TaskFormProps) {
  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: initialValues || {
      title: '',
      description: '',
      dueDate: '',
      isCompleted: false,
      priority: '2', // Default to Medium priority
    },
  });

  const { deleteTask } = useTasks();
  const router = useRouter();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State to close date picker on date selection

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{mode === 'edit' ? 'Edit Task' : 'Add New Task'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <CardContent className="flex flex-col gap-4">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="What would you like to get done?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Due Date Field */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mr-auto">Due Date</FormLabel>
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    {' '}
                    {/* Manage popover state */}
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'hover:border-input pl-3 text-left font-normal hover:bg-transparent',
                            !field.value && 'text-muted-foreground'
                          )}>
                          {field.value ? (
                            format(parseISO(field.value), 'PPP')
                          ) : (
                            <span>When is this due?</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? parseISO(field.value) : undefined}
                        onSelect={(date) => {
                          field.onChange(date ? date.toISOString() : '');
                          setIsPopoverOpen(false); // Close popover after date selection
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Priority Field */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Low (1)</SelectItem>
                      <SelectItem value="2">Medium (2)</SelectItem>
                      <SelectItem value="3">High (3)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Is Completed Checkbox */}
            <FormField
              control={form.control}
              name="isCompleted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mark as Completed</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          {/* Form Footer */}
          <CardFooter className="flex">
            <Button variant="outline" className="mr-auto" onClick={onCancel} type="button">
              Cancel
            </Button>
            {mode === 'edit' && taskId && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" type="button" className="mr-2">
                    Delete Task
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone!</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        deleteTask(taskId);
                        router.push('/');
                      }}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button type="submit">{mode === 'edit' ? 'Update Task' : 'Create Task'}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
