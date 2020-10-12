import { StarRatingModule } from 'angular-star-rating';
import { CardPreferenceComponent } from './components/preferences/card-preference/card-preference.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PreferenceComponent } from './components/preferences/preference.component';
import { RatingComponent } from './components/preferences/rating/rating.component';
import { DialogConfirmationComponent } from './components/preferences/dialog-confirmation/dialog-confirmation.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PreferenceComponent,
    CardPreferenceComponent,
    RatingComponent,
    DialogConfirmationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatDialogModule,
    MatDividerModule,
    StarRatingModule.forRoot()
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
