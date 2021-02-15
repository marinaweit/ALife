import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
} from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
  transition('One => Two, Two => Three', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ right: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('.3s linear', style({ right: '100%', opacity: 0 })),
      ]),
      query(':enter', [
        animate('.3s linear', style({ right: '0%', opacity: 1 })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Three => Two, Two => One, Main => Three', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('.3s linear', style({ left: '100%', opacity: 0 })),
      ]),
      query(':enter', [
        animate('.3s linear', style({ left: '0%', opacity: 1 })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
  //   3-> Main
  transition('Three => Main', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ right: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('.5s linear', style({ right: '100%', opacity: 0 })),
      ]),
      query(':enter', [
        animate('.5s linear', style({ right: '0%', opacity: 1 })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Main => Three', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('.5s linear', style({ left: '100%', opacity: 0 })),
      ]),
      query(':enter', [
        animate('.5s linear', style({ left: '0%', opacity: 1 })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
