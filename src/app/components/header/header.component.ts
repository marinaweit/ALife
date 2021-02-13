import * as moment from 'moment';

import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { LANGUAGE } from 'src/app/constants';
import { TranslationsService } from 'src/app/services';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';

const EXPANSION_PANEL_ANIMATION_TIMING = '300ms linear';

const expansion = trigger('expansion', [
  state('true, void', style({ height: '0' })),
  state('false', style({ height: '*' })),
  transition(
    'true <=> false, void => false',
    animate(EXPANSION_PANEL_ANIMATION_TIMING)
  ),
]);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [expansion],
})
export class HeaderComponent implements OnInit {
  @Output() headerExpanded: EventEmitter<boolean> = new EventEmitter<boolean>();

  public currentDate: string;
  public isCollapsed = false;
  public welcomeTitle: string;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event): void {
    if (!this.isCollapsed) {
      this.isCollapsed = true;
      this.headerExpanded.emit(this.isCollapsed);
    }
  }

  constructor(private translationsService: TranslationsService) {}

  ngOnInit(): void {
    const language = window.navigator.language.slice(0, 2);

    this.currentDate = `${moment()
      .locale(language)
      .format('MMMM d')}, ${moment().format('dddd')}`;

    this.getDaySegment();
  }

  public handleHeaderStateChanges(): void {
    if (!this.isCollapsed) {
      return;
    }
    this.isCollapsed = false;

    this.headerExpanded.emit(this.isCollapsed);
  }

  private getDaySegment(): void {
    const splitMorning = 6;
    const splitAfternoon = 12;
    const splitEvening = 18;
    const splitNight = 22;
    const currentHour = parseFloat(moment().format('HH'));

    if (currentHour >= splitMorning && currentHour < splitAfternoon) {
      this.welcomeTitle = `welcome_title_morning`;
    } else if (currentHour >= splitAfternoon && currentHour < splitEvening) {
      this.welcomeTitle = `welcome_title_afternoon`;
    } else if (currentHour >= splitEvening && currentHour < splitNight) {
      this.welcomeTitle = `welcome_title_evening`;
    } else {
      this.welcomeTitle = `welcome_title_night`;
    }
  }

  public translate(key: string): string {
    return this.translationsService.translate(key);
  }
}
