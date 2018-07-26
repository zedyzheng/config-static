import { NgModule  } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from '../modules/directives.module';
import { MaterialModule } from "../modules/material.module";

import { ConfigManagementRoutingModule } from "./config-management-routing.module";

import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationListDialog } from "./application-list/dialogs/application-list.dialog";
import { ApplicationSelectDialog } from "./application-list/dialogs/application-select.dialog";
import { NamespaceComponent } from './namespace/namespace.component';
import { NamespaceDialog } from "./namespace/dialogs/namespace.dialog";
import { ConfigListComponent } from './config-list/config-list.component';
import { ConfigListDialog } from "./config-list/dialogs/config-list.dialog";
import { HandleLogComponent } from './handle-log/handle-log.component';
import { HandleLogDialog } from "./handle-log/dialogs/handle-log.dialog";
import { ConfigListUploads } from './config-list/uploads/config-list.uploads';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DirectivesModule,
    ConfigManagementRoutingModule
  ],
  declarations: [
    ApplicationListComponent,
    ApplicationListDialog,
    NamespaceComponent,
    NamespaceDialog,
    ConfigListComponent,
    ApplicationSelectDialog,
    ConfigListDialog,
    HandleLogComponent,
    HandleLogDialog,
    ConfigListUploads
  ],
  entryComponents: [
    ApplicationListDialog,
    ApplicationSelectDialog,
    ConfigListDialog,
    NamespaceDialog,
    HandleLogDialog,
    ConfigListUploads
  ],
  providers: [
  ]
})
export class ConfigManagementModule { }
