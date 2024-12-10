import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoatStore } from '../../stores/boatStore';

interface FormData {
  type: string;
  model: string;
  engineModel: string;
  length: string;
  yearManufactured: string;
}

const boatTypes = [
  'Sailboat',
  'Motor Yacht',
  'Pontoon',
  'Center Console',
  'Cabin Cruiser',
  'Fishing Boat',
  'Other'
];

export function BoatSetup() {
  const navigate = useNavigate();
  const setBoat = useBoatStore(state => state.setBoat);
  
  const [formData, setFormData] = useState<FormData>({
    type: '',
    model: '',
    engineModel: '',
    length: '',
    yearManufactured: new Date().getFullYear().toString()
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors: Record<string, string> = {};
    if (!formData.type) validationErrors.type = 'Boat type is required';
    if (!formData.engineModel) validationErrors.engineModel = 'Engine model is required';
    if (!formData.length || isNaN(Number(formData.length)) || Number(formData.length) <= 0) {
      validationErrors.length = 'Please enter a valid boat length';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const boat = {
      id: Date.now().toString(),
      type: formData.type,
      model: formData.model,
      engineModel: formData.engineModel,
      length: Number(formData.length),
      yearManufactured: Number(formData.yearManufactured)
    };

    setBoat(boat);
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Set up your boat
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tell us about your vessel so we can provide personalized assistance
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Boat Type
              </label>
              <select
                id="type"
                name="type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select a type</option>
                {boatTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-2 text-sm text-red-600">{errors.type}</p>
              )}
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                Model (Optional)
              </label>
              <input
                type="text"
                name="model"
                id="model"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.model}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="engineModel" className="block text-sm font-medium text-gray-700">
                Engine Model
              </label>
              <input
                type="text"
                name="engineModel"
                id="engineModel"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.engineModel}
                onChange={handleChange}
              />
              {errors.engineModel && (
                <p className="mt-2 text-sm text-red-600">{errors.engineModel}</p>
              )}
            </div>

            <div>
              <label htmlFor="length" className="block text-sm font-medium text-gray-700">
                Length (feet)
              </label>
              <input
                type="number"
                name="length"
                id="length"
                min="1"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.length}
                onChange={handleChange}
              />
              {errors.length && (
                <p className="mt-2 text-sm text-red-600">{errors.length}</p>
              )}
            </div>

            <div>
              <label htmlFor="yearManufactured" className="block text-sm font-medium text-gray-700">
                Year Manufactured
              </label>
              <input
                type="number"
                name="yearManufactured"
                id="yearManufactured"
                min="1900"
                max={new Date().getFullYear()}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.yearManufactured}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}