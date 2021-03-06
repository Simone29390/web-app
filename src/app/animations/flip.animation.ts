import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';


export const FLIP_ANIMATION =
  trigger('flipState', [
    state('active', style({
      transform: 'rotateY(179.9deg)'
    })),
    state('inactive', style({
      transform: 'rotateY(0)'
    })),
    transition('active => inactive', animate('500ms ease-out')),
    transition('inactive => active', animate('500ms ease-in'))
  ]);
