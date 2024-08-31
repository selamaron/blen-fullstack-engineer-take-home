import TaskList from '@/components/task-list';
import ChecklistIcon from '@icons/checklist-icon.svg';

export default function Page() {
  return (
    <div className="flex h-full flex-col">
      <div className="bg-card flex w-full items-center gap-2 border-b px-4 py-4 text-xl">
        <ChecklistIcon className="h-6 w-6 fill-white" />
        <h2>TaskMaster</h2>
      </div>
      <TaskList />
    </div>
  );
}
