import { Component, Input, OnInit } from '@angular/core';
import { LANGUAGE } from 'src/app/constants';
import { TranslationsService } from 'src/app/services';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  @Input() activity;

  private language: string;
  constructor(private translationsService: TranslationsService) {}

  ngOnInit(): void {
    this.language =
      window.navigator.language.slice(0, 2) !== LANGUAGE.ru
        ? LANGUAGE.en
        : LANGUAGE.ru;
  }

  public isEnglish(): boolean {
    return this.language === LANGUAGE.en;
  }

  public setActivityIcon(type: string): string {
    switch (type) {
      case 'physycalActivity':
        return '🤸';
      case 'healthyEating':
        return '🍏';
      case 'health':
        return '📿';
      case 'organization':
        return '📃';
      case 'recreation':
        return '🛁';
      case 'hobby':
        return '🎨';
    }
  }

  public setActivityBackground(type: string): string {
    switch (type) {
      case 'physycalActivity':
        return '#c2eefc';
      case 'healthyEating':
        return '#bff377';
      case 'health':
        return '#ffa3bf';
      case 'organization':
        return '#89b7fa';
      case 'recreation':
        return '#fbdf6f';
      case 'hobby':
        return '#bcafe4';
    }
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }
}
