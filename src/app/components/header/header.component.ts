import * as moment from 'moment';

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CalendarService,
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
import { map } from 'rxjs/operators';

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
export class HeaderComponent implements OnInit, OnChanges {
  @Output() headerExpanded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() touched: boolean;

  public isCollapsed = false;
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

  ngOnInit(): void {
    const calendar$ = this.calendarService.getSelectedDate();
    const score$ = this.scoreService.getScore();

    this.vm$ = combineLatest([calendar$, score$]).pipe(
      map(([calendar, score]) => {
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
          selectedDate: calendar,
          welcomeTitle: welcomeTitleMax
            ? welcomeTitleMax
            : welcomeTitleCalendar,
          isScoreMax,
        };
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.touched && !changes.touched.firstChange) {
      this.isCollapsed = !!!changes.touch;
      this.headerExpanded.emit(this.isCollapsed);
    }
  }

  public getCurrentDateTitle(date: string): string {
    const language = window.navigator.language.slice(0, 2);

    return `${moment(date, 'DDMMYYYY')
      .locale(language)
      .format('MMMM DD')}, ${moment().format('dddd')}`;
  }

  public handleHeaderStateChanges(): void {
    if (!this.isCollapsed) {
      return;
    }
    this.isCollapsed = false;

    this.headerExpanded.emit(this.isCollapsed);
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
