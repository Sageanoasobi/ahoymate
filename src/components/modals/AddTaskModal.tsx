import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useBoatStore } from '../../stores/boatStore';
import { useMaintenanceStore } from '../../stores/maintenanceStore';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TaskFormData {
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  isRecurring: boolean;
  frequency?: string;
  reminderDays: string;
  files: File[];
}

const FREQUENCIES = [
  'None',
  'Weekly',
  'Monthly',
  'Quarterly',
  'Annually'
];

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const { boat } = useBoatStore();
  const { addTask } = useMaintenanceStore();
  
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: '',
    isRecurring: false,
    frequency: 'None',
    reminderDays: '7',
    files: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.dueDate) return;

    addTask({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      dueDate: new Date(formData.dueDate),
      completed: false,
      boatId: boat!.id,
      recurring: formData.frequency?.toLowerCase() || 'none',
      reminderDays: parseInt(formData.reminderDays)
    });

    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }));
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-2xl font-semibold text-gray-900">
                      Add Maintenance Task
                    </Dialog.Title>
                    <p className="mt-2 text-sm text-gray-500">
                      Schedule regular maintenance to keep your boat in top shape.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-8">
                      {/* Task Information Section */}
                      <div className="bg-white rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Task Information</h4>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                              Task Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="title"
                              value={formData.title}
                              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              placeholder="e.g., Oil Change, Hull Cleaning"
                            />
                          </div>

                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              id="description"
                              rows={3}
                              value={formData.description}
                              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              placeholder="e.g., Replace engine oil with 15W-40. Check filters."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Schedule & Reminders Section */}
                      <div className="bg-white rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Schedule & Reminders</h4>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                              Due Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              id="dueDate"
                              value={formData.dueDate}
                              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                          </div>

                          <div>
                            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                              Recurring Task
                            </label>
                            <select
                              id="frequency"
                              value={formData.frequency}
                              onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            >
                              {FREQUENCIES.map(freq => (
                                <option key={freq} value={freq}>{freq}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="reminderDays" className="block text-sm font-medium text-gray-700 mb-1">
                              Reminder (days before)
                            </label>
                            <input
                              type="number"
                              id="reminderDays"
                              value={formData.reminderDays}
                              onChange={(e) => setFormData(prev => ({ ...prev, reminderDays: e.target.value }))}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              min="1"
                              max="30"
                            />
                          </div>

                          <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                              Priority
                            </label>
                            <select
                              id="priority"
                              value={formData.priority}
                              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Attachments Section */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Attachments
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <div className="flex text-sm text-gray-600 justify-center">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  type="file"
                                  className="sr-only"
                                  multiple
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
                        >
                          Save Task
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}