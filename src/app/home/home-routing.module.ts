import { ApplicationsComponent } from './applications/applications.component';
import { BooksComponent } from './books/books.component';
import { GamesComponent } from './games/games.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home.component';
import { MusicsComponent } from './musics/musics.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'musics',
    component: MusicsComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'applications',
    component: ApplicationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
