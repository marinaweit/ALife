import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LANGUAGE } from 'src/app/constants';
import {
  CalendarService,
  ScoreService,
  TranslationsService,
} from 'src/app/services';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit, OnDestroy {
  @Input() activity;

  public selectedDate: string;
  public currentDate: string = moment().format('DDMMYYYY');

  private language: string;
  private sub: Subscription;

  constructor(
    private translationsService: TranslationsService,
    private calendarService: CalendarService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    this.language =
      window.navigator.language.slice(0, 2) !== LANGUAGE.ru
        ? LANGUAGE.en
        : LANGUAGE.ru;

    this.sub = this.calendarService
      .getSelectedDate()
      .subscribe((date) => (this.selectedDate = date));
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public isEnglish(): boolean {
    return this.language === LANGUAGE.en;
  }

  public setActivityIcon(type: string): string {
    switch (type) {
      case 'physycalActivity':
        return '💪🏼';
      case 'healthyEating':
        return '🍏';
      case 'health':
        return '💊';
      case 'organization':
        return '🗃';
      case 'recreation':
        return '🏖';
      case 'hobby':
        return '🎨';
    }
  }

  public setActivityBackground(type: string): string {
    switch (type) {
      case 'physycalActivity':
        return '#c2eefc';
      case 'healthyEating':
        return '#bff377';
      case 'health':
        return '#ffa3bf';
      case 'organization':
        return '#89b7fa';
      case 'recreation':
        return '#fbdf6f';
      case 'hobby':
        return '#bcafe4';
    }
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }

  public markAsDone(activity): void {
    const storageItems = JSON.parse(localStorage.getItem('doneActivities'));

    const newStorageData = storageItems
      ? [...storageItems, activity]
      : [activity];

    localStorage.setItem('doneActivities', JSON.stringify(newStorageData));

    this.scoreService
      .getScore()
      .pipe(take(1))
      .subscribe((score) => {
        const newScore = score + Number(activity.gsx$activityscore.$t);
        this.scoreService.setScore(newScore);
      });

    // const playtime = Number(localStorage.getItem('playtime')) / 60;
    // const analyticsOptions = {
    //   playtime: playtime,
    //   activity_id: activity.gsx$activityid.$t,
    // };
    // this.analitycsService.logEvent('activity_complete', analyticsOptions);
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
}
