import { AuthGuard } from './../auth/auth.guard';
import { ApplicationsComponent } from './applications/applications.component';
import { BooksComponent } from './books/books.component';
import { GamesComponent } from './games/games.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home.component';
import { MusicsComponent } from './musics/musics.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterestsComponent } from './user/interests/interests.component';

const routes: Routes = [
  {
    path: 'app/user/interests',
    component: InterestsComponent
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
    path: 'app',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
