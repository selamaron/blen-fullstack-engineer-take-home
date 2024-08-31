'use client';

import { cn } from '@/lib/utils';
import { useTasks } from '@/providers/task-provider';
import { Button } from '@ui/button';
import { useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa';

interface Props {
  className?: string;
}
export const RefreshButton = ({ className }: Props) => {
  const { refreshTasks, isFetchingTasks } = useTasks();
  const [isManuallyRefreshing, setIsManuallyRefreshing] = useState(false);

  const handleRefreshClick = () => {
    setIsManuallyRefreshing(true);
    refreshTasks();

    // Enforce at least 1 second of "Refreshing..." state so it doesn't feel awful
    setTimeout(() => {
      setIsManuallyRefreshing(false);
    }, 1000);
  };

  return (
    <Button
      onClick={handleRefreshClick}
      disabled={isFetchingTasks || isManuallyRefreshing}
      className={cn('relative flex items-center space-x-2 text-sm text-gray-400', className)}
      variant="ghost">
      <FaSyncAlt
        className={cn(
          'h-4 w-4 transition-transform duration-500',
          (isFetchingTasks || isManuallyRefreshing) && 'text-muted-foreground animate-spin'
        )}
      />
      <span className={cn(isFetchingTasks || isManuallyRefreshing ? 'text-muted-foreground' : '')}>
        Refresh
      </span>
    </Button>
  );
};
