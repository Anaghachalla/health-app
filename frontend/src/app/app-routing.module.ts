import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import components
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MedicinesListComponent } from './medicines-list/medicines-list.component';
import { DoctorSearchComponent } from './doctor-search/doctor-search.component';
import { FeedbackPopupComponent } from './feedback-popup/feedback-popup.component';

const routes: Routes = [
  { 
    path: 'signup',
    component: SignupComponent
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'medicines',
    component: MedicinesListComponent
  },
  {
    path: 'doctors',
    component: DoctorSearchComponent
  },
  {
    path: 'feedback',
    component: FeedbackPopupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  SignupComponent,
  LoginComponent,
  IndexComponent,
  ForgotPasswordComponent,
  HomeComponent,
  ProfileComponent,
  MedicinesListComponent,
  DoctorSearchComponent,
  FeedbackPopupComponent
]
