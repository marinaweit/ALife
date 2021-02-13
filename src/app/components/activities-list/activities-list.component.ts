import * as moment from 'moment';

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ApiService, TranslationsService } from '../../services';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface ActivitiesListViewModel {
  activities: any;
}

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss'],
})
export class ActivitiesListComponent implements OnInit, OnChanges {
  @Input() headerExpanded;

  public expanded = true;
  public headerHeight: string;
  public vm$: Observable<ActivitiesListViewModel>;

  constructor(
    private apiService: ApiService,
    private translationsService: TranslationsService
  ) {}

  ngOnInit(): void {
    const headerElement = document.getElementById('header') as HTMLStyleElement;
    this.headerHeight = `${headerElement.offsetHeight + 120}px`;

    headerElement.style.setProperty('--headerHeight', this.headerHeight);

    const activities$ = this.apiService
      .getActivities()
      .pipe(
        map((res) =>
          res.feed.entry.filter(
            (activity) => activity.gsx$dayid.$t === moment().format('DDMMYYYY')
          )
        )
      );

    const translations$ = this.apiService.getLocalizations().pipe(
      map((res) => res.feed.entry),
      tap((translations) =>
        this.translationsService.setTranslations(translations)
      )
    );

    this.vm$ = combineLatest([activities$, translations$]).pipe(
      map(([activities]) => ({
        activities,
      }))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes.headerExpanded &&
      !changes.headerExpanded.firstChange
    ) {
      this.expanded = !changes.headerExpanded.currentValue;
    }
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }
}
