import { Boat } from '../../../types/boat';

interface BoatDetailsProps {
  boat: Boat;
}

export function BoatDetails({ boat }: BoatDetailsProps) {
  return (
    <div className="card">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Boat Details</h3>
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
  );
}