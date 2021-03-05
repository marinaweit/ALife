import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import {
  CalendarService,
  HeaderService,
  ScoreService,
  TranslationsService,
} from 'src/app/services';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { combineLatest, Observable } from 'rxjs';
import { map, pairwise } from 'rxjs/operators';

const dayChange = trigger('inOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.2s linear', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('0.2s linear', style({ opacity: 0 })),
    style({ opacity: 1 }),
  ]),
]);

const EXPANSION_PANEL_ANIMATION_TIMING = '200ms linear';

const expansion = trigger('expansion', [
  state('true, void', style({ height: '0' })),
  state('false', style({ height: '*' })),
  transition(
    'true <=> false, void => false',
    animate(EXPANSION_PANEL_ANIMATION_TIMING)
  ),
]);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [expansion, dayChange],
})
export class HeaderComponent implements OnInit {
  public triggerDayChange = true;
  public currentDate: string = moment().format('DDMMYYYY');
  public nextDate: string = moment().add(1, 'day').format('DDMMYYYY');
  public vm$: Observable<{
    headerState: boolean;
    selectedDate: string;
    welcomeTitle: string | void;
    isScoreMax: boolean;
  }>;

  constructor(
    private translationsService: TranslationsService,
    private calendarService: CalendarService,
    private scoreService: ScoreService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    const headerState$ = this.headerService.getHeaderState();
    const calendar$ = this.calendarService.getSelectedDate();
    const score$ = this.scoreService.getScore();

    calendar$.pipe(pairwise()).subscribe(([previousValue, currentValue]) => {
      if (previousValue === currentValue) {
        return;
      }

      this.triggerDayChange = false;
      setTimeout(() => {
        this.triggerDayChange = true;
      }, 0);
    });

    this.vm$ = combineLatest([headerState$, calendar$, score$]).pipe(
      map(([headerState, calendar, score]) => {
        let welcomeTitleCalendar;

        if (calendar !== moment().add(1, 'day').format('DDMMYYYY')) {
          welcomeTitleCalendar =
            this.currentDate !== calendar
              ? 'day_completed'
              : this.getDaySegment();
        } else {
          welcomeTitleCalendar = 'next_day';
        }

        const welcomeTitleMax = score === 100 ? 'great_job' : '';
        const isScoreMax = score === 100;

        return {
          headerState,
          selectedDate: calendar,
          welcomeTitle: welcomeTitleMax
            ? welcomeTitleMax
            : welcomeTitleCalendar,
          isScoreMax,
        };
      })
    );
  }

  public getCurrentDateTitle(date: string): string {
    const language = window.navigator.language.slice(0, 2);

    return `${moment(date, 'DDMMYYYY')
      .locale(language)
      .format('MMMM DD')}, ${moment().format('dddd')}`;
  }

  public handleHeaderStateChanges(headerState: boolean): void {
    this.headerService.setHeaderState(!headerState);
  }

  private getDaySegment(): string {
    const splitMorning = 6;
    const splitAfternoon = 12;
    const splitEvening = 18;
    const splitNight = 22;
    const currentHour = parseFloat(moment().format('HH'));

    if (currentHour >= splitMorning && currentHour < splitAfternoon) {
      return `welcome_title_morning`;
    } else if (currentHour >= splitAfternoon && currentHour < splitEvening) {
      return `welcome_title_afternoon`;
    } else if (currentHour >= splitEvening && currentHour < splitNight) {
      return `welcome_title_evening`;
    } else {
      return `welcome_title_night`;
    }
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }
}
