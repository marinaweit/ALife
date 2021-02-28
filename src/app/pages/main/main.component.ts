import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CalendarService } from 'src/app/services';
import { pairwise } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

const dayChange = trigger('inOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.4s linear', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('0.4s linear', style({ opacity: 0 })),
    style({ opacity: 1 }),
  ]),
]);

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [dayChange],
})
export class MainComponent implements OnInit, OnDestroy {
  public headerExpanded: boolean;
  public touched: boolean;
  public triggerDayChange = true;

  private sub: Subscription;
  private isNextDay: boolean;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.sub = this.calendarService
      .getSelectedDate()
      .pipe(pairwise())
      .subscribe(([previousValue, currentValue]) => {
        this.isNextDay = moment(currentValue, 'DDMMYYYY').isAfter(moment());

        if (previousValue === currentValue) {
          return;
        }

        this.triggerDayChange = false;
        setTimeout(() => {
          this.triggerDayChange = true;
        }, 0);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public handleHeaderState(event: boolean): void {
    setTimeout(() => {
      this.headerExpanded = event;
    }, 0);
  }

  public handleTouch(event: Event): void {
    event.stopPropagation();
    if (this.isNextDay) {
      return;
    }
    this.touched = !this.touched;
  }
}
