import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { MainNavbarComponent } from './views/shared/components/main-navbar/main-navbar.component';
import { MainFooterComponent } from './views/shared/components/main-footer/main-footer.component';
import { LoginComponent } from './views/users/login/login.component';
import { DashboardComponent } from './views/users/dashboard/dashboard.component';
import { PageNotFoundComponent } from './views/errors/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './views/errors/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavbarComponent,
    MainFooterComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
