import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public headerExpanded: boolean;
  constructor() {}

  ngOnInit(): void {}

  public handleHeaderState(event: boolean): boolean {
    return (this.headerExpanded = event);
  }
}
