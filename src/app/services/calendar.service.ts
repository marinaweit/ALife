import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private selectedDate$: BehaviorSubject<string> = new BehaviorSubject<string>(
    moment().format('DDMMYYYY')
  );

  constructor() {}

  public setSelectedDate(date: string): void {
    this.selectedDate$.next(date);

    const activitiesList = document.getElementsByTagName(
      'app-activities-list'
    )[0];

    if (activitiesList) {
      activitiesList.scrollIntoView();
    }
  }

  public getSelectedDate(): Observable<string> {
    return this.selectedDate$;
  }
}
