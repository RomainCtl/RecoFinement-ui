import { DialogConfirmationComponent } from './auth/components/preferences/dialog-confirmation/dialog-confirmation.component';
import { MatCheckboxDefaultOptions, MatCheckboxModule, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthReverseGuard } from './auth/auth-reverse.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedirectConfirmationComponent } from './shared/modals/redirect-confirmation/redirect-confirmation.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { BooksComponent } from './home/books/books.component';
import { GamesComponent } from './home/games/games.component';
import { MoviesComponent } from './home/movies/movies.component';
import { MusicsComponent } from './home/musics/musics.component';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './home/menu/menu.component';
import { StarRatingModule } from 'angular-star-rating';
import { AuthGuard } from './auth/auth.guard';
import { Interceptor } from './auth/interceptor';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './home/applications/applications.component';
import { LoginComponent } from './auth/components/login/login.component';
import { CardPreferenceComponent } from './auth/components/preferences/card-preference/card-preference.component';
import { PreferenceComponent } from './auth/components/preferences/preference.component';
import { RatingComponent } from './auth/components/preferences/rating/rating.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { PaginationService, NgxPaginationModule } from 'ngx-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SeriesComponent } from './home/series/series.component';
import { PreviewComponent } from 'src/app/home/musics/preview/preview.component';
import { PopupComponent } from 'src/app/shared/modals/popup/popup.component';
import { InterestsComponent } from 'src/app/auth/components/user/interests/interests.component';
import { ResetPasswordComponent } from './auth/components/user/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './auth/components/user/forget-password/forget-password.component';
import { NotificationComponent } from './shared/modals/notification/notification/notification.component';
import { HistoryTracksComponent } from './auth/components/user/history-tracks/history-tracks.component';
import { TermsOfUseComponent } from './auth/components/register/modal/terms-of-use/terms-of-use.component';
import { GroupManagementComponent } from './auth/components/group-management/group-management.component';
import { AddGroupComponent } from './auth/components/add-group/add-group.component';
import { AddMemberComponent } from './auth/components/add-member/add-member.component';
import { SliderComponent } from './shared/slider/slider/slider.component';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { FeedbackComponent } from './shared/feedback/feedback/feedback.component';
import { SliderHistoryComponent } from './shared/slider/slider-history/slider-history.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    MusicsComponent,
    MoviesComponent,
    GamesComponent,
    BooksComponent,
    ApplicationsComponent,
    LoginComponent,
    RegisterComponent,
    PreferenceComponent,
    CardPreferenceComponent,
    RatingComponent,
    PopupComponent,
    DialogConfirmationComponent,
    ProfileComponent,
    PreviewComponent,
    SeriesComponent,
    InterestsComponent,
    RedirectConfirmationComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    NotificationComponent,
    HistoryTracksComponent,
    TermsOfUseComponent,
    GroupManagementComponent,
    AddGroupComponent,
    AddMemberComponent,
    SliderComponent,
    FeedbackComponent,
    SliderHistoryComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StarRatingModule.forRoot(),
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatBadgeModule,
    FlexLayoutModule,
    InfiniteScrollModule,
    MatBottomSheetModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgbModule,
    SwiperModule
  ],
  providers: [
    PaginationService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    AuthGuard,
    AuthReverseGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
