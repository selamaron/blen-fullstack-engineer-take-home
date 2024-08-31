import { db } from '@/db/client';
import { NewTask, tasks as tasksTable } from '@/db/schema';
import { NextResponse } from 'next/server';

// GET: Fetch all tasks
export async function GET() {
  try {
    const tasks = db.select().from(tasksTable).all(); // Fetch tasks from the database
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

// POST: Add a new task
export async function POST(req: Request) {
  try {
    const newTask: NewTask = await req.json(); // Parse the incoming request body as a NewTask
    const insertedTask = db.insert(tasksTable).values(newTask).returning().get(); // Insert task into DB
    return NextResponse.json(insertedTask);
  } catch (error) {
    console.error('Error adding task:', error);
    return NextResponse.json({ error: 'Failed to add task' }, { status: 500 });
  }
}
