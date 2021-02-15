import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationsService } from 'src/app/services';
import { AnalyticsService } from '../../../services/analytics.service';
@Component({
  selector: 'app-tutorial-one',
  templateUrl: './tutorial-one.component.html',
  styleUrls: ['../tutorial.component.scss'],
})
export class TutorialOneComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private analyticsService: AnalyticsService,
    private translationsService: TranslationsService
  ) {}

  ngAfterViewInit(): void {
    document.addEventListener(
      'deviceready',
      () => {
        this.analyticsService.logEvent('tutor_step_1');
      },
      false
    );
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }

  public toNextTutorialPage(): void {
    this.router.navigateByUrl('tutorial-two');
  }
}
