import { Navigate, Link } from 'react-router-dom';
import { useBoatStore } from '../../stores/boatStore';
import { useAuthStore } from '../../stores/authStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faGauge, faCalendar } from '@fortawesome/free-solid-svg-icons';

export function Dashboard() {
  const { boat } = useBoatStore();
  const { user } = useAuthStore();

  if (!boat) {
    return <Navigate to="/setup" replace />;
  }

  const upcomingTasks = [
    {
      id: '1',
      title: 'Oil Change',
      description: 'Regular engine maintenance',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      completed: false,
      boatId: boat.id
    }
  ];

  const dashboardTitle = user?.boatName 
    ? `${user.boatName} Dashboard`
    : 'Dashboard';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{dashboardTitle}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <FontAwesomeIcon icon={faShip} className="text-blue-600 text-xl" />
            <h2 className="text-lg font-semibold">Boat Details</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Boat Type</p>
              <p className="font-medium">{boat.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Model</p>
              <p className="font-medium">{boat.model || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Length</p>
              <p className="font-medium">{boat.length} ft</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Year</p>
              <p className="font-medium">{boat.yearManufactured}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Engine Model</p>
              <p className="font-medium">{boat.engineModel}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <FontAwesomeIcon icon={faGauge} className="text-blue-600 text-xl" />
            <h2 className="text-lg font-semibold">Quick Stats</h2>
          </div>
          <div className="space-y-2">
            <p>Next maintenance due in 7 days</p>
            <p>2 upcoming tasks</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faCalendar} className="text-blue-600 text-xl" />
            <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
          </div>
          <Link to="/maintenance" className="text-blue-600 hover:text-blue-700">
            View All
          </Link>
        </div>
        <div className="divide-y">
          {upcomingTasks.map(task => (
            <div key={task.id} className="py-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}