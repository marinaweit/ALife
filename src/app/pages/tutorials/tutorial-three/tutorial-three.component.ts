import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { TranslationsService } from 'src/app/services/translations.service';

@Component({
  selector: 'app-tutorial-three',
  templateUrl: './tutorial-three.component.html',
  styleUrls: ['../tutorial.component.scss'],
})
export class TutorialThreeComponent implements AfterViewInit {
  constructor(
    private translationsService: TranslationsService,
    private router: Router,
    private analyticsService: AnalyticsService
  ) {}

  ngAfterViewInit(): void {
    this.analyticsService.logEvent('tutor_step_3');
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }

  public toMainPage(): void {
    this.router.navigateByUrl('main');

    localStorage.setItem('tutorialPassed', 'true');
    localStorage.setItem('light', 'true');

    const playtime = Number(localStorage.getItem('playtime')) / 60;
    const analyticsOptions = { playtime: playtime };
    this.analyticsService.logEvent('tutorial_complete', analyticsOptions);
  }
}
