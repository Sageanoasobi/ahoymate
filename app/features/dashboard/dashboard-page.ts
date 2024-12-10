import { EventData, Page } from '@nativescript/core';
import { DashboardViewModel } from './dashboard-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new DashboardViewModel();
}