import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, pairwise, startWith, tap } from 'rxjs/operators';
import {
  CalendarService,
  ScoreService,
  TranslationsService,
} from 'src/app/services';
import { trigger, transition, style, animate } from '@angular/animations';

const dayChange = trigger('inOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.2s linear', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('0.2s linear', style({ opacity: 0 })),
    style({ opacity: 1 }),
  ]),
]);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  animations: [dayChange],
})
export class ChartComponent implements OnInit {
  @Input() expanded: boolean;

  public vm$: Observable<{ score: number; scoreDasharray: string }>;
  public triggerDayChange = true;

  constructor(
    private translationsService: TranslationsService,
    private scoreService: ScoreService,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    const score$ = this.scoreService.getScore();
    const calendar$ = this.calendarService.getSelectedDate().pipe(
      startWith([null]),
      pairwise(),
      tap(([previousValue, currentValue]) => {
        if (previousValue !== currentValue) {
          this.triggerDayChange = false;
          setTimeout(() => {
            this.triggerDayChange = true;
          }, 0);
        }
      })
    );

    this.vm$ = this.vm$ = combineLatest([score$, calendar$]).pipe(
      map(([score]) => ({
        score,
        scoreDasharray: `${score.toString()},${(100 - score).toString()}`,
      }))
    );
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }
}
