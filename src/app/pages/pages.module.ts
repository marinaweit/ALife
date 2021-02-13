import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [MainComponent],
})
export class PagesModule {}
