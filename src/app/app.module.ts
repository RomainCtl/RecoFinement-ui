import { AuthGuard } from './auth/auth.guard';
import { Interceptor } from './shared/interceptor';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { PreferenceComponent } from './user/preference/preference.component';
import { CardPreferenceComponent } from './user/preference/card-preference/card-preference.component';

import { StarRatingModule } from 'angular-star-rating';
import { RatingComponent } from './tools/rating/rating.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    PreferenceComponent,
    CardPreferenceComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    StarRatingModule.forRoot()
    AuthModule,
    HomeModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }