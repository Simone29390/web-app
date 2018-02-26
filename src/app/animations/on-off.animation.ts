import { animate, state, style, transition, trigger } from '@angular/animations';

export const ON_OFF_ANIMATION =
  trigger('onOffTrigger', [
    state('off', style({
      backgroundColor: '#E5E7E9',
      transform: 'scale(1)'
    })),
    state('on',   style({
      backgroundColor: '#17202A',
      transform: 'scale(1.1)'
    })),
    transition('off => on', animate('.6s 100ms ease-in')),
    transition('on => off', animate('.7s 100ms ease-out'))
  ]);
