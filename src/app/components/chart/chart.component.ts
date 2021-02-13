import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScoreService, TranslationsService } from 'src/app/services';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() expanded: boolean;

  public vm$: Observable<{ score: number; scoreDasharray: string }>;

  constructor(
    private translationsService: TranslationsService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    const score$ = this.scoreService.getScore();

    this.vm$ = score$.pipe(
      map((score) => ({
        score,
        scoreDasharray: `${score.toString()},${(100 - score).toString()}`,
      }))
    );
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }
}
