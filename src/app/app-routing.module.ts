import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { LoginComponent } from "./login/login.component";
import { LayoutComponent } from "./layout/layout.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: LayoutComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'config-management', loadChildren: './config-management/config-management.module#ConfigManagementModule' },
      { path: 'user-management', loadChildren: './user-management/user-management.module#UserManagementModule' },
    ]
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
