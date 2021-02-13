import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LANGUAGE } from 'src/app/constants';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public weekCalendar = [];
  public currentMonth: string;
  public selectedDate: moment.Moment = moment().locale('ru');

  private language: string;
  constructor() {}

  ngOnInit(): void {
    this.language =
      window.navigator.language.slice(0, 2) !== LANGUAGE.ru
        ? LANGUAGE.en
        : LANGUAGE.ru;

    this.getCurrentWeek();

    this.currentMonth = moment().locale(this.language).format('MMMM');
  }

  public highlightCurrentDay(day: string): boolean {
    const highlightenedDate = this.selectedDate
      ? moment(this.selectedDate).format('D')
      : moment().format('D');

    if (moment(day).format('D') === highlightenedDate) {
      return true;
    }
  }

  private getCurrentWeek(): void {
    const weekStart = moment().clone().startOf('week');

    for (let i = 0; i <= 6; i++) {
      this.weekCalendar.push(
        moment(weekStart).add(i, 'days').format('YYYY-MM-DD HH:mm:ss')
      );
    }
  }

  public getDay(date: string): string {
    return moment(date).format('D');
  }

  public getDayName(date: string): string {
    return moment(date).locale(this.language).format('dd')[0].toUpperCase();
  }
}
