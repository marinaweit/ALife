import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private headerState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor() {}

  public setHeaderState(state: boolean): void {
    this.headerState$.next(state);
  }

  public getHeaderState(): Observable<boolean> {
    return this.headerState$;
  }
}
