import { ProfileComponent } from './auth/components/profile/profile.component';
import { AuthReverseGuard } from './auth/auth-reverse.guard';
import { BooksComponent } from './home/books/books.component';
import { ApplicationsComponent } from './home/applications/applications.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NgModule  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './auth/components/register/register.component';
import { GamesComponent } from './home/games/games.component';
import { MoviesComponent } from './home/movies/movies.component';
import { MusicsComponent } from './home/musics/musics.component';
import { PreferenceComponent } from './auth/components/preferences/preference.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
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
    path: 'app',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
      path: 'app/applications',
      component: ApplicationsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'app/books',
      component: BooksComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'app/games',
      component: GamesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'app/movies',
      component: MoviesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'app/musics',
      component: MusicsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'app/profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '**',
      redirectTo: 'login'
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
