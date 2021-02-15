import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  AnalyticsService,
  ApiService,
  LoaderService,
  TranslationsService,
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private apiService: ApiService,
    private translationsService: TranslationsService,
    private analyticsService: AnalyticsService,
    private loaderService: LoaderService
  ) {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    this.onDeviceReady();
  }

  public vm$: Observable<{ loading: boolean }>;

  private onDeviceReady(): void {
    this.analyticsService.startTimer();

    const loading$ = this.loaderService.getLoaderState();
    const translations$ = this.apiService.getLocalizations().pipe(
      map((res) => res.feed.entry),
      tap((translations) =>
        this.translationsService.setTranslations(translations)
      )
    );

    this.vm$ = combineLatest([loading$, translations$]).pipe(
      map(([loading]) => ({ loading }))
    );
  }
}
