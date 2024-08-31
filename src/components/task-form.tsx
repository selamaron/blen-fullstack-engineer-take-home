'use client';

import { EditFormSchema } from '@/schema/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { Checkbox } from '@ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Textarea } from '@ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Reusable form component for both create and edit tasks
type TaskFormProps = {
  initialValues?: z.infer<typeof EditFormSchema>; // Initial values for form
  onSubmit: (data: z.infer<typeof EditFormSchema>) => void; // Submit handler
  mode: 'create' | 'edit'; // Form mode - either create or edit
  onCancel: () => void; // Cancel handler
};

export function TaskForm({ initialValues, onSubmit, mode, onCancel }: TaskFormProps) {
  const form = useForm<z.infer<typeof EditFormSchema>>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: initialValues || {
      title: '',
      description: '',
      dueDate: '',
      isCompleted: false,
    },
  });

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{mode === 'edit' ? 'Edit Task' : 'Add New Task'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <CardContent className="flex flex-col gap-4">
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
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input placeholder="When is this due?" type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <CardFooter className="flex">
            <Button variant="outline" className="mr-auto" onClick={onCancel} type="button">
              Cancel
            </Button>
            {mode === 'edit' && (
              <Button variant="destructive" type="button" className="mr-2">
                Delete Task
              </Button>
            )}
            <Button type="submit">{mode === 'edit' ? 'Update Task' : 'Create Task'}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
