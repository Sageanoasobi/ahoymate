import { Navigate } from 'react-router-dom';
import { useBoatStore } from '../../stores/boatStore';
import { useAuthStore } from '../../stores/authStore';
import { BoatDetails } from './components/BoatDetails';
import { MaintenanceOverview } from './components/MaintenanceOverview';
import { WeatherWidget } from './components/WeatherWidget';
import { QuickActions } from './components/QuickActions';

export function Dashboard() {
  const { boat } = useBoatStore();
  const { user } = useAuthStore();

  if (!boat) {
    return <Navigate to="/setup" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.boatName ? `${user.boatName} Dashboard` : 'Dashboard'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.fullName}
          </p>
        </div>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BoatDetails boat={boat} />
        <WeatherWidget />
      </div>

      <MaintenanceOverview boatId={boat.id} />
    </div>
  );
}