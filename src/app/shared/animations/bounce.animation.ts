import { trigger, transition, style, animate, keyframes } from "@angular/animations";

export const EnterLogin = trigger('enterLogin', [
    transition(':enter', [
        style({ transform: 'scale(1)' }),  // initial
        animate('0.5s',
            keyframes([
                style({ transform: 'scale(1,1) translateY(0)' }),
                style({ transform: 'scale(1.1, 0.9) translateY(0)' }),
                style({ transform: 'scale(0.9, 1.1) translateY(-100px)' }),
                style({ transform: 'scale(1.05, 0.95) translateY(0)' }),
                style({ transform: 'scale(1,1) translateY(-7px)' }),
                style({ transform: 'scale(1,1) translateY(0)' }),
            ])
        )
    ])
])