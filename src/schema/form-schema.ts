import { z } from 'zod';

// Define the input type for form handling
export const TaskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  dueDate: z.string().min(1, 'Due Date is required'),
  isCompleted: z.boolean(),
  priority: z.enum(['1', '2', '3']), // Priority is a string in the input
});

// Define the output type for backend/API communication
export const TaskFormOutputSchema = TaskFormSchema.transform((data) => ({
  ...data,
  priority: Number(data.priority), // Transform priority to number in output
}));

// Types for input and output
export type TaskFormInput = z.infer<typeof TaskFormSchema>;
export type TaskFormOutput = z.infer<typeof TaskFormOutputSchema>;
