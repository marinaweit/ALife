import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ComponentsModule } from '../components/components.module';
import { TutorialOneComponent } from './tutorials/tutorial-one/tutorial-one.component';
import { TutorialTwoComponent } from './tutorials/tutorial-two/tutorial-two.component';
import { TutorialThreeComponent } from './tutorials/tutorial-three/tutorial-three.component';

@NgModule({
  declarations: [
    MainComponent,
    TutorialOneComponent,
    TutorialTwoComponent,
    TutorialThreeComponent,
  ],
  imports: [CommonModule, ComponentsModule],
  exports: [MainComponent],
})
export class PagesModule {}
