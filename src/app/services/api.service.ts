import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly googleSpreadSheetsUrl: string =
    'https://spreadsheets.google.com/feeds/list';
  private readonly sheetId: string =
    '1EdRY3lixXyK5QQ8lSxng3BYXxBdbJSRAJhL_6Mu68W0';
  private readonly googleSpreadSheetOptions: string = 'public/full?alt=json';

  private readonly activityTabId: string = 'on1pfku';
  private readonly activitiesUrl: string = `${this.googleSpreadSheetsUrl}/${this.sheetId}/${this.activityTabId}/${this.googleSpreadSheetOptions}`;

  private readonly localizationTabId = 'otjntvn';
  private readonly localizationUrl: string = `${this.googleSpreadSheetsUrl}/${this.sheetId}/${this.localizationTabId}/${this.googleSpreadSheetOptions}`;

  constructor(private http: HttpClient) {}

  public getActivities(): Observable<any> {
    return this.http.get(this.activitiesUrl);
  }

  public getLocalizations(): Observable<any> {
    return this.http.get(this.localizationUrl);
  }
}
