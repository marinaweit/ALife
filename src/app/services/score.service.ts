import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private score$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  public setScore(score: number): void {
    this.score$.next(score);
  }

  public getScore(): Observable<number> {
    return this.score$;
  }
}
