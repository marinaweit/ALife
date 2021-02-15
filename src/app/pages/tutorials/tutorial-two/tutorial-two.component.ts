import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { TranslationsService } from 'src/app/services/translations.service';

@Component({
  selector: 'app-tutorial-two',
  templateUrl: './tutorial-two.component.html',
  styleUrls: ['../tutorial.component.scss'],
})
export class TutorialTwoComponent implements AfterViewInit {
  constructor(
    private translationsService: TranslationsService,
    private router: Router,
    private analyticsService: AnalyticsService
  ) {}

  ngAfterViewInit(): void {
    this.analyticsService.logEvent('tutor_step_2');
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }

  public toNextTutorialPage(): void {
    this.router.navigateByUrl('tutorial-three');
  }
}
