import { Injectable } from '@angular/core';

declare let FirebasePlugin;
declare let facebookConnectPlugin;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private playtime: number;

  constructor() {}

  public logEvent(event: string, options: any = {}): void {
    // FirebasePlugin.logEvent(event, options);
    // facebookConnectPlugin.logEvent(
    //   event,
    //   options,
    //   1,
    //   (res) => {
    //     console.log('success', res);
    //   },
    //   (err) => {
    //     console.log('err', err);
    //   }
    // );
  }

  public startTimer(): void {
    // TODO: PODUMOJ NAD SVOIM KODOM
    // this.playtime = Number(localStorage.getItem('playtime')) || 0;
    // setInterval(() => {
    //   this.playtime++;
    //   localStorage.setItem('playtime', this.playtime.toString());
    //   switch (this.playtime) {
    //     case 300:
    //       FirebasePlugin.logEvent('playtime_5', {});
    //       break;
    //     case 600:
    //       FirebasePlugin.logEvent('playtime_10', {});
    //       break;
    //     case 900:
    //       FirebasePlugin.logEvent('playtime_15', {});
    //       break;
    //     case 1200:
    //       FirebasePlugin.logEvent('playtime_20', {});
    //       break;
    //     case 1800:
    //       FirebasePlugin.logEvent('playtime_30', {});
    //       break;
    //     case 3600:
    //       FirebasePlugin.logEvent('playtime_60', {});
    //       break;
    //   }
    // }, 1000);
  }
}
