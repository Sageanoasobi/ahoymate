import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoatStore } from '../../../stores/boatStore';
import { useMaintenanceStore } from '../../../stores/maintenanceStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { validateMaintenanceTask } from '../utils/validation';
import { MaintenanceTask } from '../../../types/boat';

type Priority = MaintenanceTask['priority'];

interface FormData {
  title: string;
  description: string;
  dueDate: string;
  recurring: string;
  reminderDays: string;
  priority: Priority;
}

export function AddMaintenanceTask() {
  const navigate = useNavigate();
  const { boat } = useBoatStore();
  const addTask = useMaintenanceStore(state => state.addTask);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    dueDate: '',
    recurring: 'none',
    reminderDays: '7',
    priority: 'medium'
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateMaintenanceTask(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!boat) {
      navigate('/setup');
      return;
    }

    addTask({
      title: formData.title,
      description: formData.description,
      dueDate: new Date(formData.dueDate),
      completed: false,
      boatId: boat.id,
      recurring: formData.recurring,
      reminderDays: parseInt(formData.reminderDays),
      priority: formData.priority
    });

    navigate('/maintenance');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Maintenance Task</h1>
        <p className="text-gray-600">Schedule regular maintenance to keep your boat in top shape.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Task Information</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Task Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Oil Change, Hull Cleaning"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Replace engine oil with 15W-40. Check filters."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Schedule & Reminders</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Due Date <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="input-field"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="recurring" className="block text-sm font-medium text-gray-700">
                Recurring Task
              </label>
              <div className="mt-1">
                <select
                  id="recurring"
                  name="recurring"
                  value={formData.recurring}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="none">None</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="reminderDays" className="block text-sm font-medium text-gray-700">
                Reminder (days before)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="reminderDays"
                  name="reminderDays"
                  value={formData.reminderDays}
                  onChange={handleChange}
                  className="input-field"
                  min="1"
                  max="30"
                />
                {errors.reminderDays && (
                  <p className="mt-1 text-sm text-red-600">{errors.reminderDays}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <div className="mt-1">
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Attachments
              </label>
              <div className="mt-1">
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FontAwesomeIcon icon={faUpload} className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
                {files.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/maintenance')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="primary-button"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}