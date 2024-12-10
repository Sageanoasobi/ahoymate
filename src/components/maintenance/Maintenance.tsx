import { useState } from 'react';
import { useMaintenanceStore } from '../../stores/maintenanceStore';
import { PlusIcon } from '@heroicons/react/24/outline';
import { AddTaskModal } from '../modals/AddTaskModal';
import { TaskFilter } from './TaskFilter';

export function Maintenance() {
  const { tasks, toggleTask } = useMaintenanceStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (statusFilter !== 'all') {
      if (statusFilter === 'completed' && !task.completed) return false;
      if (statusFilter === 'pending' && task.completed) return false;
    }
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Keep track of all your vessel's maintenance needs
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Task
          </button>
        </div>
      </div>

      <TaskFilter
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        categoryFilter={categoryFilter}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onCategoryChange={setCategoryFilter}
      />

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow border border-[#E5E7EB]">
          <p className="text-gray-500">No maintenance tasks found.</p>
          <p className="text-gray-500 mt-1">Try adjusting your filters or add a new task to get started!</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md border border-[#E5E7EB]">
          <ul className="divide-y divide-[#E5E7EB]">
            {filteredTasks.map((task) => (
              <li key={task.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="text-sm text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            task.priority === 'high' 
                              ? 'bg-red-100 text-red-800'
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {task.priority}
                          </span>
                          {task.category && (
                            <span className="text-sm text-gray-500">
                              {task.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          task.completed
                            ? 'text-white bg-blue-600 hover:bg-blue-700'
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      >
                        {task.completed ? 'Completed' : 'Mark Complete'}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}