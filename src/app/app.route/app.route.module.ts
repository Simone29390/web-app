import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationStepperComponent } from "../registration-stepper/registration-stepper.component";
import { LoginActivate } from "../login.activate";
import { MainViewComponent } from "../app-main/main-view/main-view.component";
import { RouteComponent } from './route/route.component';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    canActivate: [LoginActivate]
  },
  {
    path: 'login',
    component: RegistrationStepperComponent,
    canActivate: [LoginActivate]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: [RouteComponent]
})

export class RoutingModule {}
