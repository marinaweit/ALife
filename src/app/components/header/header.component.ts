import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarService, HeaderService } from 'src/app/services';
import * as moment from 'moment';
import { inOutAnimation } from '../../animations/in-out.animation';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [inOutAnimation],
})
export class HeaderComponent implements OnInit {
  public vm$: Observable<{
    headerState: boolean;
    selectedDate: string;
  }>;

  constructor(
    private headerService: HeaderService,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    const headerState$ = this.headerService.getHeaderState();
    const selectedDate$ = this.calendarService.getSelectedDate();

    this.vm$ = combineLatest([headerState$, selectedDate$]).pipe(
      map(([headerState, selectedDate]) => ({ headerState, selectedDate }))
    );
  }

  public handleHeaderStateChanges(headerState: boolean): void {
    this.headerService.setHeaderState(!headerState);
  }

  public getCurrentDateTitle(date: string): string {
    const language = window.navigator.language.slice(0, 2);

    return `${moment(date, 'DDMMYYYY')
      .locale(language)
      .format('MMMM DD')}, ${moment().format('dddd')}`;
  }
}
