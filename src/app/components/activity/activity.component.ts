import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LANGUAGE } from 'src/app/constants';
import {
  AnalyticsService,
  CalendarService,
  ScoreService,
  TranslationsService,
} from 'src/app/services';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { MatExpansionPanel } from '@angular/material/expansion';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit, OnDestroy {
  @Input() activity;
  @ViewChild(MatExpansionPanel, { static: true })
  matExpansionPanelElement: MatExpansionPanel;

  public selectedDate: string;
  public currentDate: string = moment().format('DDMMYYYY');
  public isDone: boolean;

  private language: string;
  private sub: Subscription;

  constructor(
    private translationsService: TranslationsService,
    private calendarService: CalendarService,
    private scoreService: ScoreService,
    private analitycsService: AnalyticsService
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
        return '#E6FFFF';
      case 'healthyEating':
        return '#EAFFE6';
      case 'health':
        return '#FFE6ED';
      case 'organization':
        return '#E6F3FF';
      case 'recreation':
        return '#FFFFE6';
      case 'hobby':
        return '#FCE6FF';
    }
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }

  public markAsDone(activity): void {
    this.matExpansionPanelElement.close();
    this.isDone = true;

    setTimeout(() => {
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

      const playtime = Number(localStorage.getItem('playtime')) / 60;
      const analyticsOptions = {
        playtime: playtime,
        activity_id: activity.gsx$activityid.$t,
      };
      this.analitycsService.logEvent('activity_complete', analyticsOptions);
    }, 150);
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
