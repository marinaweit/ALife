import * as moment from 'moment';
import { AfterViewInit, Component } from '@angular/core';
import {
  CalendarService,
  ScoreService,
  TranslationsService,
} from 'src/app/services';

import { combineLatest, Observable } from 'rxjs';
import { delay, map, pairwise, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-welcome-tile',
  templateUrl: './welcome-tile.component.html',
  styleUrls: ['./welcome-tile.component.scss'],
})
export class WelcomeTileComponent implements AfterViewInit {
  public triggerDayChange = true;
  public currentDate: string = moment().format('DDMMYYYY');
  public nextDate: string = moment().add(1, 'day').format('DDMMYYYY');
  public vm$: Observable<{
    selectedDate: string;
    welcomeTitle: string | void;
    isScoreMax: boolean;
  }>;

  constructor(
    private translationsService: TranslationsService,
    private calendarService: CalendarService,
    private scoreService: ScoreService
  ) {}

  ngAfterViewInit(): void {
    const selectedDate$ = this.calendarService.getSelectedDate();
    const score$ = this.scoreService.getScore();

    selectedDate$
      .pipe(pairwise())
      .subscribe(([previousValue, currentValue]) => {
        if (previousValue === currentValue) {
          return;
        }

        this.triggerDayChange = !this.triggerDayChange;
        setTimeout(() => {
          this.triggerDayChange = !this.triggerDayChange;
        }, 400);
      });

    this.vm$ = combineLatest([selectedDate$, score$]).pipe(
      startWith([null]),
      delay(0),
      map(([selectedDate, score]) => {
        const isScoreMax = score === 100;
        const welcomeTitle = this.getWelcomeTitle(selectedDate, score);

        return {
          selectedDate,
          welcomeTitle,
          isScoreMax,
        };
      }),
      tap((res) => {
        setTimeout(() => {
          this.setHeaderImage(res.selectedDate, res.isScoreMax);
          this.setWelcomeTitle(res.welcomeTitle);
        }, 200);
      })
    );
  }

  public getCurrentDateTitle(date: string): string {
    const language = window.navigator.language.slice(0, 2);

    return `${moment(date, 'DDMMYYYY')
      .locale(language)
      .format('MMMM DD')}, ${moment().format('dddd')}`;
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

  public getWelcomeTitle(selectedDate: string, score: number): string {
    if (!selectedDate) {
      return;
    }

    const welcomeTitleMax = score === 100 ? 'great_job' : '';
    if (welcomeTitleMax) {
      return welcomeTitleMax;
    }

    if (selectedDate !== moment().add(1, 'day').format('DDMMYYYY')) {
      return this.currentDate !== selectedDate
        ? 'day_completed'
        : this.getDaySegment();
    } else {
      return 'next_day';
    }
  }

  public setWelcomeTitle(welcomeTitle: string | void): string {
    if (!welcomeTitle) {
      return;
    }
    document.getElementById('welcomeTitle').innerHTML = this.translate(
      welcomeTitle
    );
  }

  public translate(key: string): string {
    return this.translationsService.translate(key) || 'Hello there!';
  }
}
