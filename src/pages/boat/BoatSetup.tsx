import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoatStore } from '../../stores/boatStore';
import { z } from 'zod';

const boatSchema = z.object({
  type: z.string().min(1, 'Boat type is required'),
  model: z.string().optional(),
  engineModel: z.string().min(1, 'Engine model is required'),
  length: z.number().min(1, 'Length must be greater than 0'),
  yearManufactured: z.number().min(1900).max(new Date().getFullYear()),
});

type FormData = z.infer<typeof boatSchema>;

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
    length: 0,
    yearManufactured: new Date().getFullYear(),
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = boatSchema.parse(formData);
      setBoat({
        id: Date.now().toString(),
        ...validatedData,
      });
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'length' || name === 'yearManufactured' 
        ? Number(value) 
        : value
    }));
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
                value={formData.length || ''}
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
              {errors.yearManufactured && (
                <p className="mt-2 text-sm text-red-600">{errors.yearManufactured}</p>
              )}
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