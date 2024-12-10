import { format } from 'date-fns';
import { MaintenanceTask } from '../../../types/boat';
import { useMaintenanceStore } from '../../../stores/maintenanceStore';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface TaskListProps {
  tasks: MaintenanceTask[];
}

export function TaskList({ tasks }: TaskListProps) {
  const { toggleTask } = useMaintenanceStore();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">No maintenance tasks found.</p>
        <p className="text-gray-500 mt-1">Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 sm:p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {task.priority === 'high' ? (
                <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
              ) : (
                <CheckCircleIcon className="h-6 w-6 text-blue-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </p>
              <p className="mt-2 text-sm text-gray-700">{task.description}</p>
              {task.recurring !== 'none' && (
                <p className="mt-1 text-sm text-gray-500">
                  Recurring: {task.recurring}
                </p>
              )}
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => toggleTask(task.id)}
                className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                  task.completed
                    ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    : 'border-transparent text-white bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}