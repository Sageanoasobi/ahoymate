export interface Boat {
  id: string;
  type: string;
  model?: string;
  engineModel: string;
  length: number;
  yearManufactured: number;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  boatId: string;
  recurring: string;
  reminderDays: number;
  priority: 'low' | 'medium' | 'high';
  category: string;
}