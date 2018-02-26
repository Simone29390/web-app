import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const BOOM_OUT_ANIMATION =
  trigger('boomState', [
    transition('void => *', [
      style({transform: 'translateX(0) scale(0)'}),
      animate(200)
    ])
  ]);
