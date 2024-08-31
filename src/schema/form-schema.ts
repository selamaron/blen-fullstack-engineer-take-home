import { z } from 'zod';

export const EditFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  isCompleted: z.boolean(),
});
