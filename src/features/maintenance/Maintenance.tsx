import { useNavigate } from 'react-router-dom';
import { useMaintenanceStore } from '../../stores/maintenanceStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export function Maintenance() {
  const navigate = useNavigate();
  const { tasks, toggleTask } = useMaintenanceStore();

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then sort by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  const isOverdue = (date: Date) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Maintenance Tasks</h1>
        <button 
          onClick={() => navigate('/maintenance/add')} 
          className="primary-button flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add Task</span>
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No maintenance tasks yet.</p>
          <p className="text-gray-500 mt-2">Add your first task to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTasks.map(task => (
            <div 
              key={task.id} 
              className={`card ${task.completed ? 'bg-gray-50' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </h3>
                    {!task.completed && isOverdue(task.dueDate) && (
                      <FontAwesomeIcon 
                        icon={faExclamationTriangle} 
                        className="text-red-500"
                        title="Task is overdue"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <p className="text-sm text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    {task.recurring !== 'none' && (
                      <p className="text-sm text-gray-500">
                        Recurring: {task.recurring}
                      </p>
                    )}
                    <p className={`text-sm capitalize ${getPriorityColor(task.priority)}`}>
                      {task.priority} priority
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`p-2 rounded-full ${
                    task.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}