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
import { InterestsComponent } from './user/interests/interests.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [MenuComponent, HomeComponent, MusicsComponent, MoviesComponent, GamesComponent, BooksComponent, ApplicationsComponent, InterestsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MatExpansionModule,
    MatListModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule
  ],
  exports: [
    HomeComponent,
    MenuComponent
  ]
})
export class HomeModule { }
