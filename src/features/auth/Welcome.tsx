import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faWrench, faRobot } from '@fortawesome/free-solid-svg-icons';

export function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to BoatMate AI
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Your personal boating assistant powered by AI
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <FontAwesomeIcon icon={faShip} className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Track Maintenance</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Keep your vessel in top condition with personalized maintenance schedules
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <FontAwesomeIcon icon={faWrench} className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">DIY Projects</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Get step-by-step guidance for boat maintenance and repairs
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <FontAwesomeIcon icon={faRobot} className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">AI Assistant</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Get expert advice tailored to your specific boat
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/setup"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Get Started
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}