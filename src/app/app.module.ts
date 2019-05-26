import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { MainNavbarComponent } from './views/shared/components/main-navbar/main-navbar.component';
import { HcMastheadAComponent } from './views/home/components/hc-masthead-a/hc-masthead-a.component';
import { HcPatientsSearchComponent } from './views/home/components/hc-patients-search/hc-patients-search.component';
import { MainFooterComponent } from './views/shared/components/main-footer/main-footer.component';
import { LoginComponent } from './views/users/login/login.component';
import { DashboardComponent } from './views/users/dashboard/dashboard.component';
import { DashUsersComponent } from './views/users/dashboard/components/dash-users/dash-users.component';
import { DashPatientsComponent } from './views/users/dashboard/components/dash-patients/dash-patients.component';
import { DashLocationsComponent } from './views/users/dashboard/components/dash-locations/dash-locations.component';
import { DashEquipamentsComponent } from './views/users/dashboard/components/dash-equipaments/dash-equipaments.component';
import { DashFooterComponent } from './views/users/dashboard/components/dash-footer/dash-footer.component';
import { PreloadingComponent } from './views/shared/components/preloading/preloading.component';
import { PageNotFoundComponent } from './views/errors/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './views/errors/server-error/server-error.component';

// Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';

// Pipes
import { UserFilterPipe } from './shared/pipes/user-filter.pipe';
import { PatientFilterPipe } from './shared/pipes/patient-filter.pipe';
import { LocationFilterPipe } from './shared/pipes/location-filter.pipe';
import { EquipamentFilterPipe } from './shared/pipes/equipament-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavbarComponent,
    HcMastheadAComponent,
    HcPatientsSearchComponent,
    MainFooterComponent,
    LoginComponent,
    DashboardComponent,
    DashPatientsComponent,
    PreloadingComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
    DashFooterComponent,
    DashUsersComponent,
    UserFilterPipe,
    PatientFilterPipe,
    LocationFilterPipe,
    DashLocationsComponent,
    EquipamentFilterPipe,
    DashEquipamentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, AuthGuard, AngularFirestore, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
