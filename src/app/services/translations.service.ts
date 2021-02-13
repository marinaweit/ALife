import { Injectable } from '@angular/core';
import { LANGUAGE } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  private translations;

  constructor() {}

  public setTranslations(translations): void {
    this.translations = translations;
  }

  public getTranslations(): void {
    return this.translations;
  }

  public translate(key: string): string {
    if (this.translations) {
      const translationObj: any = this.translations.find(
        (obj: any) => obj.gsx$key.$t === key
      );

      return window.navigator.language.slice(0, 2) === LANGUAGE.en
        ? translationObj.gsx$en.$t
        : translationObj.gsx$ru.$t;
    }
  }
}
