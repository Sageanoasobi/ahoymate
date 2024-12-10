import { Frame } from '@nativescript/core';

export class NavigationService {
  static navigate(page: string, context?: any) {
    Frame.topmost().navigate({
      moduleName: `features/${page}/${page}-page`,
      context: context
    });
  }

  static goBack() {
    Frame.topmost().goBack();
  }
}