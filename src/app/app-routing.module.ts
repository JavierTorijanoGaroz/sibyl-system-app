import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/users/login/login.component';
import { DashboardComponent } from './views/users/dashboard/dashboard.component';
import { DashUsersComponent } from './views/users/dashboard/components/dash-users/dash-users.component';
import { DashPatientsComponent } from './views/users/dashboard/components/dash-patients/dash-patients.component';
import { DashLocationsComponent } from './views/users/dashboard/components/dash-locations/dash-locations.component';
import { DashEquipamentsComponent } from './views/users/dashboard/components/dash-equipaments/dash-equipaments.component';
import { PreloadingComponent } from './views/shared/components/preloading/preloading.component';
import { PageNotFoundComponent } from './views/errors/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './views/errors/server-error/server-error.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user/:uid', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: '', component: PreloadingComponent, outlet: 'dashboard' },
      { path: 'overview', component: PreloadingComponent, outlet: 'dashboard' },
      { path: 'users', component: DashUsersComponent, outlet: 'dashboard' },
      { path: 'patients', component: DashPatientsComponent, outlet: 'dashboard' },
      { path: 'locations', component: DashLocationsComponent, outlet: 'dashboard' },
      { path: 'equipment', component: DashEquipamentsComponent, outlet: 'dashboard' }
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
