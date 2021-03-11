import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  AnalyticsService,
  ApiService,
  LoaderService,
  TranslationsService,
} from './services';
import { routeTransitionAnimations } from './animations/routing.animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations],
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

  public prepareRoute(outlet: RouterOutlet): void {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }
}
