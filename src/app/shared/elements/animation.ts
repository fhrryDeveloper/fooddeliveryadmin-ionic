import {trigger, state, style, transition, animate} from '@angular/animations';

export const fadeInOutTranslate = trigger('fadeInOutTranslate', [
    transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
    ]),
    transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
    ])
]);
