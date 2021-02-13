import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TranslationsService } from 'src/app/services';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() expanded: boolean;
  public score = 30;

  constructor(private translationsService: TranslationsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const donutElement = document.getElementById('donut') as HTMLStyleElement;

    donutElement.style.setProperty('--score', this.score.toString());
    donutElement.style.setProperty(
      '--scoreEmpty',
      (100 - this.score).toString()
    );
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }
}
