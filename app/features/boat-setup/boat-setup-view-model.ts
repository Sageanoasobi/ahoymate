import { Observable } from '@nativescript/core';
import { BoatService } from '../../shared/services/boat.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { ValidationUtil } from '../../shared/utils/validation.util';

export class BoatSetupViewModel extends Observable {
    private boatService: BoatService;
    
    boatType: string = '';
    engineModel: string = '';
    boatLength: number = 0;
    yearManufactured: number = new Date().getFullYear();

    constructor() {
        super();
        this.boatService = new BoatService();
    }

    onSaveBoat() {
        if (!this.validateInput()) {
            return;
        }

        const boat = {
            id: Date.now().toString(),
            type: this.boatType,
            engineModel: this.engineModel,
            length: this.boatLength,
            yearManufactured: this.yearManufactured
        };

        this.boatService.saveBoatDetails(boat);
        NavigationService.navigate('dashboard');
    }

    private validateInput(): boolean {
        return this.boatType.length > 0 &&
               this.engineModel.length > 0 &&
               ValidationUtil.isValidBoatLength(this.boatLength) &&
               ValidationUtil.isValidYear(this.yearManufactured);
    }
}