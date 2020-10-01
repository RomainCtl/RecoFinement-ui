import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home.component';
import { MusicsComponent } from './musics/musics.component';
import { MoviesComponent } from './movies/movies.component';
import { GamesComponent } from './games/games.component';
import { BooksComponent } from './books/books.component';
import { ApplicationsComponent } from './applications/applications.component';


@NgModule({
  declarations: [MenuComponent, HomeComponent, MusicsComponent, MoviesComponent, GamesComponent, BooksComponent, ApplicationsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent,
    MenuComponent
  ]
})
export class HomeModule { }
