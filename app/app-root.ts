import { Application } from '@nativescript/core';
import { BoatService } from './shared/services/boat.service';
import { Routes } from './shared/constants/navigation-routes';

export function onLoaded() {
    const boatService = new BoatService();
    const initialPage = boatService.getCurrentBoat() ? Routes.DASHBOARD : Routes.BOAT_SETUP;
    
    Application.getRootView().navigate({
        moduleName: initialPage,
        clearHistory: true
    });
}