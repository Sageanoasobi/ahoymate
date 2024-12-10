export interface IBoat {
  id: string;
  type: string;
  engineModel: string;
  length: number;
  yearManufactured: number;
}

export interface IMaintenanceTask {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  boatId: string;
}