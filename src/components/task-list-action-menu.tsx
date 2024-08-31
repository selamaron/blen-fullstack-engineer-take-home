'use client';

import { useTasks } from '@/providers/task-provider';
import { Button } from '@ui/button';

export const TaskListActionMenu = () => {
  const { expandAllTasks, collapseAllTasks } = useTasks();

  return (
    <div className="mr-3 flex gap-3">
      <Button variant="link" className="p-0" onClick={expandAllTasks}>
        Expand all (+)
      </Button>
      <Button variant="link" className="p-0" onClick={collapseAllTasks}>
        Collapse all (-)
      </Button>
    </div>
  );
};
