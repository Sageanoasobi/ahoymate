import { Application } from '@nativescript/core';
import { registerFontIcon } from '@nativescript/font-icons';

registerFontIcon({
    fontFamily: 'Font Awesome 6 Free',
    fontUrl: '~/assets/fonts/fa-solid-900.ttf'
});

Application.run({ moduleName: 'app-root' });