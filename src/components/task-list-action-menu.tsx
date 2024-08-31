'use client';

import { Button } from '@ui/button';

export const TaskListActionMenu = () => {
  return (
    <div className="mr-2 flex gap-2">
      <Button variant="link" className="p-0">
        Expand all (+)
      </Button>
      <Button variant="link" className="p-0">
        Collapse all (-)
      </Button>
    </div>
  );
};
