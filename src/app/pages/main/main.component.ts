import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
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
