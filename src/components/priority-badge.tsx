import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';

interface PriorityBadgeProps {
  priority: number;
  short?: boolean;
  className?: string;
}

export const PriorityBadge = ({ priority, short, className }: PriorityBadgeProps) => {
  // Map priority to label and color
  const priorityMap: Record<
    number,
    { label: string; shorthand: string; color: 'secondary' | 'default' | 'destructive' }
  > = {
    1: { label: 'Low', shorthand: 'L', color: 'secondary' },
    2: { label: 'Medium', shorthand: 'M', color: 'default' },
    3: { label: 'High', shorthand: 'H', color: 'destructive' },
  };

  // Get the corresponding label and color for the priority
  const { label, shorthand, color } = priorityMap[priority as 1 | 2 | 3] || {
    label: 'Unknown',
    shorthand: '?',
    color: 'default',
  };

  return (
    <Badge
      variant={color}
      className={cn(short && 'h-5 w-5 justify-center rounded-sm px-0', className)}>
      {short ? shorthand : label}
    </Badge>
  );
};
