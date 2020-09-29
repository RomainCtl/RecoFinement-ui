import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PreferenceComponent } from './user/preference/preference.component';
import { CardPreferenceComponent } from './user/preference/card-preference/card-preference.component';

import { StarRatingModule } from 'angular-star-rating';
import { RatingComponent } from './tools/rating/rating.component';

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
    StarRatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }