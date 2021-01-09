import { RecoDashboardModule } from './dashboard-view/dashboard-view.module';
import { DashboardComponent } from './dashboard-view/dashboard.component';
import { ProfileComponent } from './app-view/user/components/profile/profile.component';
import { ResetPasswordComponent } from './app-view/user/components/user/reset-password/reset-password.component';
import { SeriesComponent } from './app-view/recofinement/series/series.component';
import { AuthReverseGuard } from './auth/auth-reverse.guard';
import { BooksComponent } from './app-view/recofinement/books/books.component';
import { ApplicationsComponent } from './app-view/recofinement/applications/applications.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './app-view/recofinement/home.component';
import { LoginComponent } from './app-view/user/components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './app-view/user/components/register/register.component';
import { GamesComponent } from './app-view/recofinement/games/games.component';
import { MoviesComponent } from './app-view/recofinement/movies/movies.component';
import { MusicsComponent } from './app-view/recofinement/musics/musics.component';
import { PreferenceComponent } from './app-view/user/components/preferences/preference.component';
import { InterestsComponent } from './app-view/user/components/user/interests/interests.component';
import { HistoryTracksComponent } from './app-view/user/components/user/history-tracks/history-tracks.component';
import { AppViewModule } from './app-view/app-view.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./dashboard-view/dashboard-view.module').then(m => m.RecoDashboardModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./app-view/app-view.module').then(m => m.AppViewModule)
  },
  {
    path: '**',
    redirectTo: 'app'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RecoDashboardModule,
    AppViewModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
