import { AuthReverseGuard } from './auth/auth-reverse.guard';
import { FormsModule } from '@angular/forms';
import { BooksComponent } from './home/books/books.component';
import { GamesComponent } from './home/games/games.component';
import { MoviesComponent } from './home/movies/movies.component';
import { MusicsComponent } from './home/musics/musics.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './home/menu/menu.component';
import { StarRatingModule } from 'angular-star-rating';
import { AuthGuard } from './auth/auth.guard';
import { Interceptor } from './shared/interceptor';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './home/applications/applications.component';
import { LoginComponent } from './auth/components/login/login.component';
import { CardPreferenceComponent } from './auth/components/preferences/card-preference/card-preference.component';
import { PreferenceComponent } from './auth/components/preferences/preference.component';
import { RatingComponent } from './auth/components/preferences/rating/rating.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { PaginationService, NgxPaginationModule } from 'ngx-pagination';

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
    RatingComponent
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
    NgxPaginationModule
  ],
  providers: [
    PaginationService,
    CookieService,
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
