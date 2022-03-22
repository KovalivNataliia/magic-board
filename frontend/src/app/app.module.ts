import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { RegPageModule } from './modules/reg-page.module';
import { HeaderModule } from './modules/header.module';
import { AuthPageModule } from './modules/auth-page.module';
import { BoardPageModule } from './modules/board-page.module';
import { DialogModule } from './modules/dialog.module';

import { RegistrationService } from './services/registration.service';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth-interceptor';

import { AppComponent } from './app.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RegPageModule,
    HeaderModule,
    AuthPageModule,
    BoardPageModule,
    DialogModule
  ],
  providers: [
    RegistrationService,
    AuthService,
    NotificationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
