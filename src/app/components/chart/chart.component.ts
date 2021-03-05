import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, pairwise, startWith, tap } from 'rxjs/operators';
import {
  CalendarService,
  ScoreService,
  TranslationsService,
} from 'src/app/services';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
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
    const score$ = this.scoreService.getScore().pipe(startWith(0), pairwise());

    const calendar$ = this.calendarService
      .getSelectedDate()
      .pipe(startWith(''), pairwise());

    const triggerDayChange$ = combineLatest([calendar$, score$]).pipe(
      tap(([[previousValue, currentValue], [previousScore, currentScore]]) => {
        if (previousValue !== currentValue || previousScore !== currentScore) {
          this.triggerDayChange = false;
          setTimeout(() => {
            this.triggerDayChange = true;
          }, 0);
        }
      })
    );

    this.vm$ = this.vm$ = combineLatest([score$, triggerDayChange$]).pipe(
      map(([[previousScore, currentScore]]) => ({
        score: currentScore,
        scoreDasharray: `${currentScore.toString()},${(
          100 - currentScore
        ).toString()}`,
      }))
    );
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }
}
