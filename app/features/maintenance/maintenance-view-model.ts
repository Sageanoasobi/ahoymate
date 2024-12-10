import { Observable } from '@nativescript/core';
import { MaintenanceTask } from '../../shared/models/boat.model';
import { BoatService } from '../../shared/services/boat.service';

export class MaintenanceViewModel extends Observable {
    private boatService: BoatService;
    maintenanceTasks: MaintenanceTask[] = [];

    constructor() {
        super();
        this.boatService = new BoatService();
        this.loadTasks();
    }

    private loadTasks() {
        const boat = this.boatService.getCurrentBoat();
        if (boat) {
            this.maintenanceTasks = [
                {
                    id: '1',
                    title: 'Oil Change',
                    description: 'Regular engine maintenance',
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    completed: false,
                    boatId: boat.id
                }
            ];
            this.notifyPropertyChange('maintenanceTasks', this.maintenanceTasks);
        }
    }

    onAddTask() {
        // To be implemented
        console.log('Add task tapped');
    }
}