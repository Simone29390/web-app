import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationStepperComponent } from "../registration-stepper/registration-stepper.component";
import { LoginActivate } from "../login.activate";
import { MainViewComponent } from "../app-main/main-view/main-view.component";
import { RouteComponent } from './route/route.component';
import {InsertionDetailsComponent} from "../app-main/insertion-details/insertion-details.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {FavoriteViewComponent} from "../app-main/main-view/favorite-view.component";
import {DonationViewComponent} from "../app-main/main-view/donation-view.component";
import {EditProfileComponent} from "../app-main/edit-profile/edit-profile.component";

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    /// canActivate: [LoginActivate]
  },
  {
    path: 'login',
    component: RegistrationStepperComponent,
    // canActivate: [LoginActivate]
  },
  {
    path: 'dashboard/:id',
    component: InsertionDetailsComponent,
  },
  {
    path: 'favorite',
    component: FavoriteViewComponent,
  },
  {
    path: 'donation/:id',
    component: DonationViewComponent,
  },
  {
    path: 'edit_profile',
    component: EditProfileComponent,
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: [RouteComponent]
})

export class RoutingModule {}
