import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationListComponent }   from './application-list/application-list.component';
import { ConfigListComponent }   from './config-list/config-list.component';
import { NamespaceComponent } from "./namespace/namespace.component";
import { HandleLogComponent } from "./handle-log/handle-log.component";

const routes: Routes = [
  { path: 'application-list', component: ApplicationListComponent },
  { path: 'config-list', component: ConfigListComponent },
  { path: 'namespace', component: NamespaceComponent },
  { path: 'handle-log', component: HandleLogComponent },
  { path: '', redirectTo: 'application-list' }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ConfigManagementRoutingModule {}
