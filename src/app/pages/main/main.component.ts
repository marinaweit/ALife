import { AfterViewInit, Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { HeaderService } from 'src/app/services';

const dayChange = trigger('inOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('0.5s ease-out', style({ opacity: 0 })),
    style({ opacity: 1 }),
  ]),
]);

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [dayChange],
})
export class MainComponent implements OnInit, AfterViewInit {
  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    document.addEventListener(
      'touchmove',
      () => this.headerService.setHeaderState(false),
      false
    );
  }
}
