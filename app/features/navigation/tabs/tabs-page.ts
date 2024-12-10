import { EventData, Page } from '@nativescript/core';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
}