import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { TutorialOneComponent } from './pages/tutorials/tutorial-one/tutorial-one.component';
import { TutorialThreeComponent } from './pages/tutorials/tutorial-three/tutorial-three.component';
import { TutorialTwoComponent } from './pages/tutorials/tutorial-two/tutorial-two.component';
import { TutorialGuard } from './guards';

const routes: Routes = [
  { path: 'tutorial-one', component: TutorialOneComponent },
  {
    path: 'tutorial-two',
    component: TutorialTwoComponent,
  },
  {
    path: 'tutorial-three',
    component: TutorialThreeComponent,
  },

  { path: 'main', component: MainComponent, canActivate: [TutorialGuard] },
  { path: '**', component: MainComponent, canActivate: [TutorialGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
