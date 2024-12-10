interface MaintenanceTaskForm {
  title: string;
  description: string;
  dueDate: string;
  recurring: string;
  reminderDays: string;
  priority: string;
}

export function validateMaintenanceTask(data: MaintenanceTaskForm): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) {
    errors.title = 'Task name is required';
  }

  if (!data.dueDate) {
    errors.dueDate = 'Due date is required';
  } else {
    const selectedDate = new Date(data.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.dueDate = 'Due date cannot be in the past';
    }
  }

  const reminderDays = Number(data.reminderDays);
  if (isNaN(reminderDays) || reminderDays < 1 || reminderDays > 30) {
    errors.reminderDays = 'Reminder days must be between 1 and 30';
  }

  return errors;
}