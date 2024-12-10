import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface TaskFilterProps {
  statusFilter: string;
  priorityFilter: string;
  categoryFilter: string;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES = [
  'Engine',
  'Hull',
  'Electrical',
  'Sails',
  'Routine Maintenance',
  'Other'
];

export function TaskFilter({
  statusFilter,
  priorityFilter,
  categoryFilter,
  onStatusChange,
  onPriorityChange,
  onCategoryChange
}: TaskFilterProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6 border border-[#E5E7EB]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <div className="relative mt-1">
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="block w-full rounded-md border-[#E5E7EB] pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm appearance-none h-10"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <div className="relative mt-1">
            <select
              id="priority"
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="block w-full rounded-md border-[#E5E7EB] pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm appearance-none h-10"
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <div className="relative mt-1">
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="block w-full rounded-md border-[#E5E7EB] pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm appearance-none h-10"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}