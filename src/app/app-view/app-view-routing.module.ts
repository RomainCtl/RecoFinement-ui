import { BrowseComponent } from './recofinement/browse/browse/browse.component';
import { AuthGuard } from './../auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicsComponent } from './recofinement/musics/musics.component';
import { AppViewComponent } from './app-view.component';
import { HomeComponent } from './recofinement/home.component';
import { MoviesComponent } from './recofinement/movies/movies.component';
import { SeriesComponent } from './recofinement/series/series.component';
import { GamesComponent } from './recofinement/games/games.component';
import { BooksComponent } from './recofinement/books/books.component';
import { ApplicationsComponent } from './recofinement/applications/applications.component';
import { AuthReverseGuard } from '../auth/auth-reverse.guard';
import { LoginComponent } from './user/components/login/login.component';
import { PreferenceComponent } from './user/components/preferences/preference.component';
import { RegisterComponent } from './user/components/register/register.component';
import { ProfileComponent } from './user/components/profile/profile.component';
import { HistoryTracksComponent } from './user/components/user/history-tracks/history-tracks.component';
import { InterestsComponent } from './user/components/user/interests/interests.component';
import { ResetPasswordComponent } from './user/components/user/reset-password/reset-password.component';
import { PrivacyPolicyComponent } from './user/components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppViewComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthReverseGuard]
      },
      {
        path: 'register/preferences',
        component: PreferenceComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthReverseGuard]
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'user/profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user/interest',
        component: InterestsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user/history/tracks',
        component: HistoryTracksComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'reset/:token',
        component: ResetPasswordComponent,
        canActivate: [AuthReverseGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path:'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'musics',
        component: MusicsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'movies',
        component: MoviesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'series',
        component: SeriesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'games',
        component: GamesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'books',
        component: BooksComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'browse',
        component: BrowseComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppViewRoutingModule { }
