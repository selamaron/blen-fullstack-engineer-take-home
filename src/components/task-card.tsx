'use client';

import { type Task } from '@/db/schema';
import { cn } from '@/lib/utils';
import { useTasks } from '@/providers/task-provider';
import {
  CalendarIcon,
  CheckCircledIcon,
  ChevronDownIcon,
  CircleIcon,
  ClockIcon,
} from '@radix-ui/react-icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';
import { Badge } from '@ui/badge';
import { Card, CardContent } from '@ui/card';
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
    <Card className="border-muted overflow-hidden border shadow-md">
      <Accordion
        value={isOpen ? 'task' : ''}
        onValueChange={handleToggleTask}
        type="single"
        collapsible>
        <AccordionItem value="task">
          <AccordionTrigger className="hover:bg-muted w-full p-4 transition-colors duration-200">
            <div className="flex items-center">
              <Link href={`/task/${task.id}`}>
                <h3 className="text-card-foreground text-lg font-semibold hover:underline">
                  {task.title}
                </h3>
              </Link>
              {/* Status Badge */}
              <Badge
                variant={task.isCompleted ? 'success' : 'destructive'}
                className="ml-auto flex h-min items-center space-x-1 rounded-full px-2 py-1">
                {task.isCompleted ? (
                  <>
                    <CheckCircledIcon className="h-4 w-4" /> <span>Completed</span>
                  </>
                ) : (
                  <>
                    <CircleIcon className="h-4 w-4" /> <span>Pending</span>
                  </>
                )}
              </Badge>
              {/* Due Date */}
              <div className="text-muted-foreground ml-6 flex items-center space-x-1 text-sm">
                <CalendarIcon className="h-4 w-4" />
                <span>{task.dueDate}</span>
              </div>
              {/* Expand/Collapse Icon */}
              <ChevronDownIcon
                className={cn(
                  'text-muted-foreground ml-4 h-4 w-4 shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </div>
          </AccordionTrigger>
          <AccordionContent className={cn('border-muted border-t')}>
            <CardContent className="pt-4">
              <div className="mb-4">
                <p className="text-card-foreground mb-2 text-sm">{task.description}</p>
              </div>
              <div className="text-muted-foreground grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <p>
                    <strong>Created At:</strong> {task.createdAt}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <p>
                    <strong>Updated At:</strong> {task.updatedAt}
                  </p>
                </div>
              </div>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
