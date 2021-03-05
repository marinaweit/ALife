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
import { map, pairwise, tap } from 'rxjs/operators';

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
  animations: [expansion],
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

      this.triggerDayChange = !this.triggerDayChange;
      setTimeout(() => {
        this.triggerDayChange = !this.triggerDayChange;
      }, 300);
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
      }),
      tap((res) => {
        setTimeout(() => {
          this.setHeaderImage(res.selectedDate, res.isScoreMax);
          this.setWelcomeTitle(res.welcomeTitle);
        }, 500);
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

  public setHeaderImage(selectedDate: string, isScoreMax: boolean): string {
    const imageSrc = document.getElementById('logoImg') as HTMLImageElement;

    if (this.currentDate === selectedDate && !isScoreMax) {
      return (imageSrc.src = './assets/header_img_1.png');
    }

    if (this.currentDate !== selectedDate && selectedDate !== this.nextDate) {
      return (imageSrc.src = './assets/header_day_completed.png');
    }

    if (isScoreMax) {
      return (imageSrc.src = './assets/header_great_job.png');
    }

    if (selectedDate === this.nextDate) {
      return (imageSrc.src = './assets/header_img_next_day.png');
    }
  }

  public setWelcomeTitle(welcomeTitle: string): string {
    if (!welcomeTitle) return;
    return (document.getElementById('welcomeTitle').innerHTML = this.translate(
      welcomeTitle
    ));
  }

  public translate(key: string): string {
    return this.translationsService.translate(key) || '';
  }
}
