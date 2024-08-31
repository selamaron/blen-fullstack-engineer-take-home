import { db } from '@/db/client';
import { NewTask, tasks as tasksTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// GET: Fetch a single task by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const taskId = parseInt(params.id, 10);
    const task = db.select().from(tasksTable).where(eq(tasksTable.id, taskId)).get(); // Fetch the task from the database

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

// PUT: Update a task by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const taskId = parseInt(params.id, 10);
    const updatedTask: Partial<NewTask> = await req.json(); // Parse the incoming request body as an updated task

    const existingTask = db.select().from(tasksTable).where(eq(tasksTable.id, taskId)).get();
    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const result = db
      .update(tasksTable)
      .set(updatedTask)
      .where(eq(tasksTable.id, taskId))
      .returning()
      .get(); // Update the task in the database

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

// DELETE: Delete a task by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const taskId = parseInt(params.id, 10);

    // Check if the task exists
    const existingTask = db.select().from(tasksTable).where(eq(tasksTable.id, taskId)).get();
    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Correct syntax for deleting a task in Drizzle ORM with BetterSQLite3
    db.delete(tasksTable).where(eq(tasksTable.id, taskId)).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
