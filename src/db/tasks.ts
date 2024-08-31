// /db/tasks.ts
import { db } from './client';
import { tasks as tasksTable, type NewTask, type Task } from './schema';

// Fetch all tasks from the database
export const fetchTasksFromDb = (): Task[] => {
  return db.select().from(tasksTable).all();
};

// Add a new task to the database
export const addTaskToDb = (newTask: NewTask): Task => {
  return db.insert(tasksTable).values(newTask).returning().get();
};
