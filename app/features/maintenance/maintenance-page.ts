import { EventData, Page } from '@nativescript/core';
import { MaintenanceViewModel } from './maintenance-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new MaintenanceViewModel();
}