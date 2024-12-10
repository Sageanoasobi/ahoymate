import { Navigate, Link } from 'react-router-dom';
import { useBoatStore } from '../../stores/boatStore';
import { useMaintenanceStore } from '../../stores/maintenanceStore';
import { useAuthStore } from '../../stores/authStore';
import { PlusIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export function Dashboard() {
  const { boat } = useBoatStore();
  const { user } = useAuthStore();
  const { tasks } = useMaintenanceStore();

  if (!boat) {
    return <Navigate to="/setup" replace />;
  }

  // Get the 3 most recent upcoming tasks
  const upcomingTasks = tasks
    .filter(task => !task.completed && task.boatId === boat.id)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.fullName}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/maintenance"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Task
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Boat Details Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Boat Details</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900">{boat.type}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Model</dt>
                <dd className="mt-1 text-sm text-gray-900">{boat.model || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Length</dt>
                <dd className="mt-1 text-sm text-gray-900">{boat.length} ft</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Year</dt>
                <dd className="mt-1 text-sm text-gray-900">{boat.yearManufactured}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Engine Model</dt>
                <dd className="mt-1 text-sm text-gray-900">{boat.engineModel}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Quick Stats</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5">
              <div>
                <dt className="text-sm font-medium text-gray-500">Next Maintenance Due</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {upcomingTasks[0] 
                    ? new Date(upcomingTasks[0].dueDate).toLocaleDateString()
                    : 'No upcoming tasks'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Pending Tasks</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {tasks.filter(task => !task.completed && task.boatId === boat.id).length} tasks
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Completed Tasks</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {tasks.filter(task => task.completed && task.boatId === boat.id).length} tasks
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Maintenance Overview */}
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Maintenance</h3>
            <Link
              to="/maintenance"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 inline-flex items-center"
            >
              View all
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {upcomingTasks.length === 0 ? (
            <p className="text-sm text-gray-500">No upcoming maintenance tasks.</p>
          ) : (
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className="text-sm text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === 'high' 
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}