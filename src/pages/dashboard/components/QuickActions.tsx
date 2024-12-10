import { Link } from 'react-router-dom';
import { PlusIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export function QuickActions() {
  return (
    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
      <div className="flex space-x-4">
        <Link
          to="/maintenance"
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Add Task
        </Link>
        <Link
          to="/assistant"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <ChatBubbleLeftIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          Ask AI
        </Link>
      </div>
    </div>
  );
}