import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  public setLoaderState(state: boolean): void {
    this.loaderState$.next(state);
  }

  public getLoaderState(): Observable<boolean> {
    return this.loaderState$;
  }
}
