'use client';

import { type Task } from '@/db/schema';
import { cn } from '@/lib/utils';
import { useTasks } from '@/providers/task-provider';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  const { openTasks, setOpenTasks } = useTasks();

  const isOpen = useMemo(() => openTasks.includes(task.id), [openTasks, task.id]);
  const handleToggleTask = useCallback(() => {
    if (openTasks.includes(task.id)) {
      setOpenTasks(openTasks.filter((taskId) => taskId !== task.id));
    } else {
      setOpenTasks([...openTasks, task.id]);
    }
  }, [openTasks, setOpenTasks, task.id]);

  return (
    <Accordion
      value={isOpen ? 'task' : ''}
      onValueChange={handleToggleTask}
      className="bg-card w-full overflow-hidden rounded-xl shadow-md"
      type="single"
      collapsible>
      <AccordionItem value="task">
        <AccordionTrigger className="w-full p-4">
          <div className="flex items-center">
            <Link href={`/task/${task.id}`}>
              <h3 className="text-card-foreground text-lg font-semibold hover:underline">
                {task.title} - {task.id}
              </h3>
            </Link>
            <span className="text-muted-foreground ml-auto text-sm">Due: {task.dueDate}</span>
            <span
              className={cn(
                'ml-2 rounded-lg px-2 py-1 text-sm font-medium',
                task.isCompleted ? 'bg-green-200 text-green-800' : 'bg-red-500 text-red-200'
              )}>
              {task.isCompleted ? 'Completed' : 'Pending'}
            </span>

            <ChevronDownIcon
              className={cn(
                'text-muted-foreground ml-2 h-4 w-4 shrink-0 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        </AccordionTrigger>
        <AccordionContent className={cn('p-4 pt-0')}>
          <p className="text-muted-foreground mb-2">{task.description}</p>
          <div className="text-muted-foreground/50 text-sm">
            <p>Due: {task.dueDate}</p>
            <p>Created At: {task.createdAt}</p>
            <p>Updated At: {task.updatedAt}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
