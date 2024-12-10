export interface Boat {
  id: string;
  type: string;
  engineModel: string;
  length: number;
  yearManufactured: number;
  customizations?: string[];
}

export interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  boatId: string;
}