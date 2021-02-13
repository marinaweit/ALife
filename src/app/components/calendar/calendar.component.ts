import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LANGUAGE } from 'src/app/constants';
import { CalendarService } from 'src/app/services';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public weekCalendar = [];
  public currentMonth: string;
  public selectedDate: string = moment().format('DDMMYYYY');
  public currentDate: string = moment().format('DDMMYYYY');
  private language: string;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.language =
      window.navigator.language.slice(0, 2) !== LANGUAGE.ru
        ? LANGUAGE.en
        : LANGUAGE.ru;

    this.getCurrentWeek();

    this.currentMonth = moment().locale(this.language).format('MMMM');
    this.calendarService.setSelectedDate(this.selectedDate);
  }

  public highlightPastDay(day: string): boolean {
    if (moment(day).format('DDMMYYYY') === this.currentDate) {
      return;
    }

    if (moment(day).format('DDMMYYYY') === this.selectedDate) {
      return true;
    }
  }

  public highlightCurrentDay(day: string): boolean {
    if (this.selectedDate === this.currentDate) {
      return;
    }

    if (moment(day).format('DDMMYYYY') === this.currentDate) {
      return true;
    }
  }

  public highlightSelectedCurrentDay(day: string): boolean {
    if (
      moment(day).format('DDMMYYYY') === this.currentDate &&
      this.selectedDate
    ) {
      return true;
    }
  }

  public disableFutureDays(day: string): boolean {
    const calendarDay = moment(day);
    const currentDay = moment(this.currentDate, 'DDMMYYYY');

    if (calendarDay.isAfter(currentDay)) {
      return true;
    }
  }

  public openSelectedDate(date: Date): void {
    const calendarDay = moment(date);
    const currentDay = moment(this.currentDate, 'DDMMYYYY');

    if (calendarDay.isAfter(currentDay)) {
      return;
    }

    this.selectedDate = moment(date).format('DDMMYYYY');

    this.calendarService.setSelectedDate(this.selectedDate);
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
    return moment(date).locale(this.language).format('dd').toUpperCase();
  }
}
