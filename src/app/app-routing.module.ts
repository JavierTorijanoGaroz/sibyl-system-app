import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/users/login/login.component';
import { DashboardComponent } from './views/users/dashboard/dashboard.component';
import { PageNotFoundComponent } from './views/errors/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './views/errors/server-error/server-error.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', component: PageNotFoundComponent, outlet: 'user' },
      { path: 'overview', component: LoginComponent, outlet: 'user' },
      { path: 'users', component: HomeComponent, outlet: 'user' },
      { path: 'patients', component: HomeComponent, outlet: 'user' },
      { path: 'locations', component: HomeComponent, outlet: 'user' },
      { path: 'equipment', component: HomeComponent, outlet: 'user' }
    ]
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '**', pathMatch: 'full', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
