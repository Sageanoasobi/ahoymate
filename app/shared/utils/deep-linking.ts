import { Application } from '@nativescript/core';

export class DeepLinkingUtil {
    static handleDeepLink(url: string) {
        // Example URL: boatmate://app/maintenance/123
        try {
            const urlObj = new URL(url);
            if (urlObj.protocol === 'boatmate:') {
                const path = urlObj.pathname.substring(2); // Remove leading //
                const params = Object.fromEntries(urlObj.searchParams);
                
                Application.getRootView().navigate({
                    moduleName: path,
                    context: params
                });
            }
        } catch (error) {
            console.error('Deep linking error:', error);
        }
    }
}