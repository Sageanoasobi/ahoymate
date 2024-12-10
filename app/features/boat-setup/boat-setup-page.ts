import { EventData, Page } from '@nativescript/core';
import { BoatSetupViewModel } from './boat-setup-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new BoatSetupViewModel();
}