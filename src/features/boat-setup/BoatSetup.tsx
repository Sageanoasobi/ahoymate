import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoatStore } from '../../stores/boatStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { validateBoatDetails } from './utils/validation';

const boatTypes = [
  'Sailboat',
  'Motor Yacht',
  'Catamaran',
  'Pontoon Boat',
  'Center Console',
  'Cabin Cruiser',
  'Other'
];

export function BoatSetup() {
  const navigate = useNavigate();
  const setBoat = useBoatStore(state => state.setBoat);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    boatType: '',
    boatModel: '',
    engineModel: '',
    length: '',
    yearManufactured: new Date().getFullYear().toString()
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.boatType) {
      setErrors({ boatType: 'Please select a boat type' });
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateBoatDetails(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const boat = {
      id: Date.now().toString(),
      type: formData.boatType,
      model: formData.boatModel,
      engineModel: formData.engineModel,
      length: Number(formData.length),
      yearManufactured: Number(formData.yearManufactured)
    };

    setBoat(boat);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <FontAwesomeIcon icon={faShip} className="h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {step === 1 ? "Let's get to know your boat" : "Almost there!"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1 
              ? "First, tell us what type of boat you have"
              : "Now, let's get some specific details"}
          </p>
        </div>

        <div className="mt-8">
          {step === 1 ? (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Select your boat type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {boatTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, boatType: type }));
                      setErrors({});
                    }}
                    className={`p-4 border rounded-lg text-left ${
                      formData.boatType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.boatType && (
                <p className="mt-1 text-sm text-red-600">{errors.boatType}</p>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="mt-6 w-full primary-button"
              >
                Next
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="boatModel" className="block text-sm font-medium text-gray-700">
                  Boat Model
                </label>
                <input
                  id="boatModel"
                  name="boatModel"
                  type="text"
                  value={formData.boatModel}
                  onChange={handleChange}
                  className="input-field mt-1"
                  placeholder="e.g., Sea Ray 320"
                />
                {errors.boatModel && (
                  <p className="mt-1 text-sm text-red-600">{errors.boatModel}</p>
                )}
              </div>

              <div>
                <label htmlFor="yearManufactured" className="block text-sm font-medium text-gray-700">
                  Year Manufactured
                </label>
                <input
                  id="yearManufactured"
                  name="yearManufactured"
                  type="number"
                  value={formData.yearManufactured}
                  onChange={handleChange}
                  className="input-field mt-1"
                  placeholder={new Date().getFullYear().toString()}
                />
                {errors.yearManufactured && (
                  <p className="mt-1 text-sm text-red-600">{errors.yearManufactured}</p>
                )}
              </div>

              <div>
                <label htmlFor="length" className="block text-sm font-medium text-gray-700">
                  Length (feet)
                </label>
                <input
                  id="length"
                  name="length"
                  type="number"
                  value={formData.length}
                  onChange={handleChange}
                  className="input-field mt-1"
                  placeholder="e.g., 25"
                />
                {errors.length && (
                  <p className="mt-1 text-sm text-red-600">{errors.length}</p>
                )}
              </div>

              <div>
                <label htmlFor="engineModel" className="block text-sm font-medium text-gray-700">
                  Engine Model
                </label>
                <input
                  id="engineModel"
                  name="engineModel"
                  type="text"
                  value={formData.engineModel}
                  onChange={handleChange}
                  className="input-field mt-1"
                  placeholder="e.g., Yamaha F150"
                />
                {errors.engineModel && (
                  <p className="mt-1 text-sm text-red-600">{errors.engineModel}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 primary-button"
                >
                  Complete Setup
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}