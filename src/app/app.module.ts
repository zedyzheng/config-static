import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule, APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./modules/material.module";

import { AuthGuardService } from "./services/auth-guard.service";
import { ToolsService } from "./services/tools.service";
import { NotificationService } from "./services/notification.service";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { TopHeaderComponent } from "./layout/top-header/top-header.component";
import { ChangePasswordDialog } from "./layout/top-header/dialogs/change-password.dialog";
import { LeftNavComponent } from "./layout/left-nav/left-nav.component";
import { LayoutComponent } from "./layout/layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { NotificationComponent } from "./components/notification/notification.component";

import { AppInterceptor } from "./app.interceptor";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    TopHeaderComponent,
    ChangePasswordDialog,
    LeftNavComponent,
    LayoutComponent,
    DashboardComponent,
    ErrorPageComponent,
    NotificationComponent
  ],
  entryComponents: [
    NotificationComponent,
    ChangePasswordDialog
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    // 拦截器配置
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    // 工具服务
    ToolsService,
    // 拦截服务
    AuthGuardService,
    // 警告服务
    NotificationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
