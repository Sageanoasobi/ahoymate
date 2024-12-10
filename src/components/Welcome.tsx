import { Link } from 'react-router-dom';
import { 
  WrenchScrewdriverIcon, 
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentCheckIcon 
} from '@heroicons/react/24/outline';
import { BackgroundBlobs } from './BackgroundBlobs';

export function Welcome() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/50 to-white flex flex-col">
      <BackgroundBlobs />

      {/* Header with login link */}
      <header className="relative z-10">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-end">
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Log in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Welcome to Ahoy Mate AI
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Your intelligent boating companion. Let AI help you maintain and manage your vessel with expert precision.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link
                to="/create-account"
                className="rounded-md bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Get started
              </Link>
              <Link
                to="/about"
                className="text-base font-semibold leading-7 text-gray-900 hover:text-gray-600 transition-colors flex items-center"
              >
                Learn more <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          </div>

          <div className="mt-32">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <WrenchScrewdriverIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Smart Maintenance</h3>
                </div>
                <p className="text-gray-600">
                  Keep your vessel in top condition with AI-powered maintenance schedules and reminders.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Expert AI Assistant</h3>
                </div>
                <p className="text-gray-600">
                  Get personalized advice and troubleshooting help from our marine-savvy AI assistant.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Vessel Management</h3>
                </div>
                <p className="text-gray-600">
                  Track all aspects of your boat ownership in one convenient place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}