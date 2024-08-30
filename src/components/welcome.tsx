import ChecklistIcon from './icons/checklist-icon.svg';

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold"> Welcome to Full Stack Engineer Assessment</h1>
      <p className="text-sm text-gray-500">
        Follow the instructions in the{' '}
        <span className="text-muted-foreground font-bold">README.md</span> file
      </p>
      <div className="min-h-[100px] w-full border">
        <ChecklistIcon className="h-12 w-12 fill-white" />
      </div>
    </div>
  );
}
