import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

//imports
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

//services
import { UserDetailsService } from './user-details.service';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { PatientHomeComponent } from './patient-home/patient-home.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { NewAppointmentFormComponent } from './new-appointment-form/new-appointment-form.component';
import { MedicinesListComponent } from './medicines-list/medicines-list.component';
import { DoctorSearchComponent } from './doctor-search/doctor-search.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FeedbackPopupComponent } from './feedback-popup/feedback-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    PatientHomeComponent,
    DoctorHomeComponent,
    HomeComponent,
    ProfileComponent,
    DoctorProfileComponent,
    PatientProfileComponent,
    NewAppointmentFormComponent,
    MedicinesListComponent,
    DoctorSearchComponent,
    MedicineDetailsComponent,
    AdminHomeComponent,
    FeedbackPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
