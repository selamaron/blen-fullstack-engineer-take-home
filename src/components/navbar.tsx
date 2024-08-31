import ChecklistIcon from '@icons/checklist-icon.svg';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className="bg-card sticky top-0 z-10 flex w-full items-center justify-between gap-4 border-b px-6 py-4 text-lg shadow-md">
      <Link href="/" className="flex items-center gap-3">
        <ChecklistIcon className="fill-primary h-6 w-6" />
        <h1 className="text-xl font-bold">TaskMaster</h1>
      </Link>
    </div>
  );
};
