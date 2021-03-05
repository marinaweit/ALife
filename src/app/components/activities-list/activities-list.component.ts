import { Component, OnInit } from '@angular/core';
import {
  ApiService,
  CalendarService,
  HeaderService,
  ScoreService,
  TranslationsService,
} from '../../services';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';
export interface ActivitiesListViewModel {
  undoneActivities: any;
  doneActivities: any;
  selectedDate: string;
  headerState: boolean;
}

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss'],
})
export class ActivitiesListComponent implements OnInit {
  public vm$: Observable<ActivitiesListViewModel>;
  public currentDate: string = moment().format('DDMMYYYY');
  public nextDate: string = moment().add(1, 'day').format('DDMMYYYY');

  constructor(
    private apiService: ApiService,
    private translationsService: TranslationsService,
    private calendarService: CalendarService,
    private scoreService: ScoreService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    const selectedDate$ = this.calendarService.getSelectedDate().pipe(
      tap((date) => {
        this.getDayScore(date);
      })
    );

    const score$ = this.scoreService.getScore();

    const activities$ = combineLatest([
      selectedDate$,
      score$,
      this.apiService.getActivities(),
    ]).pipe(
      map(([date, score, activities]) =>
        activities.feed.entry.filter(
          (activity) => activity.gsx$dayid.$t === date
        )
      )
    );

    const undoneActivities$ = activities$.pipe(
      map((activities) =>
        activities.filter((activity) => !this.checkIfDone(activity))
      )
    );

    const doneActivities$ = activities$.pipe(
      map((activities) =>
        activities.filter((activity) => this.checkIfDone(activity))
      )
    );

    const headerState$ = this.headerService.getHeaderState();

    this.vm$ = combineLatest([
      undoneActivities$,
      doneActivities$,
      selectedDate$,
      headerState$,
    ]).pipe(
      map(([undoneActivities, doneActivities, selectedDate, headerState]) => ({
        undoneActivities,
        doneActivities,
        selectedDate,
        headerState,
      }))
    );
  }

  public checkIfDone(activity): boolean {
    const storageItems = JSON.parse(localStorage.getItem('doneActivities'));

    if (!storageItems) {
      return;
    }

    const isDone = storageItems.find((item) => {
      return item.content.$t === activity.content.$t;
    });

    return !!isDone;
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }

  private getDayScore(date: string): void {
    const storageItems = JSON.parse(localStorage.getItem('doneActivities'));

    if (!storageItems) {
      return;
    }

    const todayActivities = storageItems.filter((item) => {
      return item.gsx$dayid.$t === date;
    });

    const todayScore = todayActivities.reduce((a, b) => {
      return a + Number(b.gsx$activityscore.$t);
    }, 0);

    this.scoreService.setScore(todayScore);
  }

  public handleGoToTodayButtonClick(): void {
    this.calendarService.setSelectedDate(moment().format('DDMMYYYY'));
  }
}
