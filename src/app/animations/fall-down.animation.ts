import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';


export const FALL_DOWN_ANIMATION =
  trigger('movePanel', [

    transition('void => *', [
      animate(600, keyframes([
        style({opacity: 0, transform: 'translateY(-200px)', offset: 0}),
        style({opacity: 1, transform: 'translateY(25px)', offset: .75}),
        style({opacity: 1, transform: 'translateY(0)', offset: 1}),
      ]))
    ])
  ]);

