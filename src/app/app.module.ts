import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreferenceComponent } from './user/preference/preference.component';
import { CardPreferenceComponent } from './user/preference/card-preference/card-preference.component';

@NgModule({
  declarations: [
    AppComponent,
    PreferenceComponent,
    CardPreferenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
