import { Inbox } from "lucide-react";

const EmptyState = ({ label }: { label: string }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-400">
        <Inbox className="h-6 w-6" />
      </div>
      <p className="mt-4 text-sm font-medium text-gray-600">
        No {label} yet
      </p>
      <p className="mt-1 text-xs text-gray-400">
        Check back once they've been added to your profile.
      </p>
    </div>
  );
};

export default EmptyState;
