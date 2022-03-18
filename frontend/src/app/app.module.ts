import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { RegPageModule } from './modules/reg-page.module';
import { HeaderModule } from './modules/header.module';
import { AuthPageModule } from './modules/auth-page.module';
import { BoardPageModule } from './modules/board-page.module';

import { RegistrationService } from './services/registration.service';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';

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
    BoardPageModule
  ],
  providers: [
    RegistrationService,
    AuthService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
