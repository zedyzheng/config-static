import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../modules/material.module";
import { DirectivesModule } from '../modules/directives.module';
import { UserManagementRoutingModule } from "./user-management-routing.module";

import { UserListComponent } from "./user-list/user-list.component";
import { UserDialog } from "./user-list/dialogs/user.dialog";
import { RoleListComponent } from './role-list/role-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule,
    UserManagementRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserDialog,
    RoleListComponent
  ],
  entryComponents: [
    UserDialog
  ]
})
export class UserManagementModule { }
