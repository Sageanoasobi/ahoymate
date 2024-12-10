import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useMaintenanceStore } from '../../../stores/maintenanceStore';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface MaintenanceOverviewProps {
  boatId: string;
}

export function MaintenanceOverview({ boatId }: MaintenanceOverviewProps) {
  const { tasks } = useMaintenanceStore();
  
  const boatTasks = tasks.filter(task => task.boatId === boatId);
  const upcomingTasks = boatTasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className="card">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Upcoming Maintenance
          </h3>
          <Link
            to="/maintenance"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all
          </Link>
        </div>
        
        <div className="mt-6 flow-root">
          {upcomingTasks.length === 0 ? (
            <p className="text-sm text-gray-500">No upcoming maintenance tasks.</p>
          ) : (
            <ul className="-mb-8">
              {upcomingTasks.map((task, taskIdx) => (
                <li key={task.id}>
                  <div className="relative pb-8">
                    {taskIdx !== upcomingTasks.length - 1 ? (
                      <span
                        className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        {task.priority === 'high' ? (
                          <ExclamationCircleIcon className="h-10 w-10 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="h-10 w-10 text-blue-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {task.title}
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>{task.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}