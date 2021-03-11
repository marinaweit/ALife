import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ActivityComponent } from './activity/activity.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ChartComponent } from './chart/chart.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoaderComponent } from './loader/loader.component';
import { WelcomeTileComponent } from './welcome-tile/welcome-tile.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ActivitiesListComponent,
    ActivityComponent,
    ChartComponent,
    CalendarComponent,
    LoaderComponent,
    WelcomeTileComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
  ],
  exports: [
    WelcomeTileComponent,
    ActivitiesListComponent,
    LoaderComponent,
    HeaderComponent,
  ],
})
export class ComponentsModule {}
