import { NgxPaginationModule } from 'ngx-pagination';
import { StarRatingModule } from 'angular-star-rating';
import { CardPreferenceComponent } from './components/preferences/card-preference/card-preference.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PreferenceComponent } from './components/preferences/preference.component';
import { RatingComponent } from './components/preferences/rating/rating.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PreferenceComponent,
    CardPreferenceComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    StarRatingModule.forChild(),
    NgxPaginationModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    PreferenceComponent,
    CardPreferenceComponent,
    RatingComponent
  ]
})
export class AuthModule { }
