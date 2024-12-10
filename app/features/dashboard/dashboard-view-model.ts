import { Observable } from '@nativescript/core';
import { Boat, MaintenanceTask } from '../../shared/models/boat.model';
import { BoatService } from '../../shared/services/boat.service';
import { Frame } from '@nativescript/core';

export class DashboardViewModel extends Observable {
    private boatService: BoatService;
    boat: Boat | null = null;
    upcomingTasks: MaintenanceTask[] = [];

    constructor() {
        super();
        this.boatService = new BoatService();
        this.boat = this.boatService.getCurrentBoat();
        
        // Sample upcoming tasks
        this.upcomingTasks = [
            {
                id: '1',
                title: 'Oil Change',
                description: 'Regular engine maintenance',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                completed: false,
                boatId: this.boat?.id || ''
            }
        ];
    }

    onAskAI() {
        Frame.topmost().navigate({
            moduleName: 'features/ai-assistant/assistant-page'
        });
    }
}