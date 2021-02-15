import { Component } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AnalyticsService, ApiService, TranslationsService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private apiService: ApiService,
    private translationsService: TranslationsService,
    private analyticsService: AnalyticsService
  ) {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    this.getTranslations();
  }

  private onDeviceReady(): void {
    this.analyticsService.startTimer();
    this.getTranslations();
  }

  private getTranslations(): void {
    this.apiService
      .getLocalizations()
      .pipe(
        map((res) => res.feed.entry),
        tap((translations) =>
          this.translationsService.setTranslations(translations)
        )
      )
      .subscribe();
  }
}
