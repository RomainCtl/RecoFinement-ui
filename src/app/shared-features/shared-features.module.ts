import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StarRatingModule } from 'angular-star-rating';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgModule, enableProdMode } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { FeedbackComponent } from './feedback/feedback/feedback.component';
import { NotificationComponent } from './modals/notification/notification/notification.component';
import { PopupComponent } from './modals/popup/popup.component';
import { RedirectConfirmationComponent } from './modals/redirect-confirmation/redirect-confirmation.component';
import { SliderHistoryComponent } from './slider/slider-history/slider-history.component';
import { SliderComponent } from './slider/slider/slider.component';
import { NgbToastModule, NgbModule, NgbToast, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};


@NgModule({
  declarations: [
    FeedbackComponent, 
    NotificationComponent,
    PopupComponent,
    RedirectConfirmationComponent,
    SliderComponent,
    SliderHistoryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    SwiperModule,
    MatSelectModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    StarRatingModule.forRoot(),
    MatChipsModule,
    NgbModule,
    MatCheckboxModule,
    MatTabsModule,
    MatChipsModule,
    MatExpansionModule,
    MatSliderModule,
    MatStepperModule
  ],
  exports: [
    FeedbackComponent, 
    NotificationComponent, 
    PopupComponent,
    RedirectConfirmationComponent,
    SliderComponent,
    SliderHistoryComponent
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SharedFeaturesModule { }
