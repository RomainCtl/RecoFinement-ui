import { NotificationComponent } from './shared-features/modals/notification/notification/notification.component';
import { RecoDashboardRoutingModule } from './dashboard-view/dashboard-view-routing.module';
import { AppViewRoutingModule } from './app-view/app-view-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthReverseGuard } from './auth/auth-reverse.guard';
import { AuthGuard } from './auth/auth.guard';
import { Interceptor } from './auth/interceptor';
import { SharedFeaturesModule } from './shared-features/shared-features.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AppViewRoutingModule,
    RecoDashboardRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    SharedFeaturesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    AuthGuard,
    AuthReverseGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
