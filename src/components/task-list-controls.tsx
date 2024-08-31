'use client';

import { FilterOption, SortOption, useTasks } from '@/providers/task-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';

export const TaskListControls = () => {
  const { sortOption, setSortOption, filterOption, setFilterOption } = useTasks();

  return (
    <div className="mr-4 flex items-center space-x-4">
      {/* Combined Sort Dropdown */}
      <Select onValueChange={(value) => setSortOption(value as SortOption)} value={sortOption}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="title-asc">Title (A-Z)</SelectItem>
          <SelectItem value="title-desc">Title (Z-A)</SelectItem>
          <SelectItem value="dueDate-asc">Due Date (Earliest First)</SelectItem>
          <SelectItem value="dueDate-desc">Due Date (Latest First)</SelectItem>
          <SelectItem value="priority-asc">Priority (Low to High)</SelectItem>
          <SelectItem value="priority-desc">Priority (High to Low)</SelectItem>
          <SelectItem value="status-asc">Status (Pending First)</SelectItem>
          <SelectItem value="status-desc">Status (Completed First)</SelectItem>
        </SelectContent>
      </Select>

      {/* Filter Dropdown */}
      <Select
        onValueChange={(value) => setFilterOption(value as FilterOption)}
        value={filterOption}>
        <SelectTrigger>
          <SelectValue placeholder="Filter tasks" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tasks</SelectItem>
          <SelectItem value="completed">Completed Tasks</SelectItem>
          <SelectItem value="pending">Pending Tasks</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
