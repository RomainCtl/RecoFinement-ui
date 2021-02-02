import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingModule } from 'angular-star-rating';
import { CookieService } from 'ngx-cookie-service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule, PaginationService } from 'ngx-pagination';
import { RecoDashboardModule } from '../dashboard-view/dashboard-view.module';
import { SharedFeaturesModule } from '../shared-features/shared-features.module';
import { AppViewRoutingModule } from './app-view-routing.module';
import { AddGroupComponent } from './user/components/add-group/add-group.component';
import { AddMemberComponent } from './user/components/add-member/add-member.component';
import { GroupManagementComponent } from './user/components/group-management/group-management.component';
import { LoginComponent } from './user/components/login/login.component';
import { CardPreferenceComponent } from './user/components/preferences/card-preference/card-preference.component';
import { DialogConfirmationComponent } from './user/components/preferences/dialog-confirmation/dialog-confirmation.component';
import { PreferenceComponent } from './user/components/preferences/preference.component';
import { RatingComponent } from './user/components/preferences/rating/rating.component';
import { ProfileComponent } from './user/components/profile/profile.component';
import { TermsOfUseComponent } from './user/components/register/modal/terms-of-use/terms-of-use.component';
import { RegisterComponent } from './user/components/register/register.component';
import { ForgetPasswordComponent } from './user/components/user/forget-password/forget-password.component';
import { HistoryTracksComponent } from './user/components/user/history-tracks/history-tracks.component';
import { InterestsComponent } from './user/components/user/interests/interests.component';
import { ResetPasswordComponent } from './user/components/user/reset-password/reset-password.component';
import { ApplicationsComponent } from './recofinement/applications/applications.component';
import { BooksComponent } from './recofinement/books/books.component';
import { GamesComponent } from './recofinement/games/games.component';
import { HomeComponent } from './recofinement/home.component';
import { MenuComponent } from './recofinement/menu/menu.component';
import { MoviesComponent } from './recofinement/movies/movies.component';
import { MusicsComponent } from './recofinement/musics/musics.component';
import { PreviewComponent } from './recofinement/musics/preview/preview.component';
import { SeriesComponent } from './recofinement/series/series.component';
import { AppViewComponent } from './app-view.component';
import { PrivacyPolicyComponent } from './user/components/privacy-policy/privacy-policy.component';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowseComponent } from './recofinement/browse/browse/browse.component';

@NgModule({
  declarations: [
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
    DialogConfirmationComponent,
    ProfileComponent,
    PreviewComponent,
    SeriesComponent,
    InterestsComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    HistoryTracksComponent,
    TermsOfUseComponent,
    GroupManagementComponent,
    AddGroupComponent,
    AddMemberComponent,
    AppViewComponent,
    PrivacyPolicyComponent,
    BrowseComponent
  ],
  imports: [
    CommonModule,
    AppViewRoutingModule,
    SharedFeaturesModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    StarRatingModule.forRoot(),
    NgxPaginationModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatBadgeModule,
    FlexLayoutModule,
    InfiniteScrollModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgbModule,
    MatSelectModule,
    RecoDashboardModule,
    MatBottomSheetModule
  ],
  providers: [
    PaginationService,
    CookieService
  ]
})
export class AppViewModule { }
