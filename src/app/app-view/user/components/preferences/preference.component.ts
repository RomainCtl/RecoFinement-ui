import { ErrorService } from 'src/app/app-view/services/error/error.service';
import { Component, OnInit } from '@angular/core';

import { ApplicationService } from 'src/app/app-view/services/media/application.service';
import { BookService } from 'src/app/app-view/services/media/book.service';
import { GameService } from 'src/app/app-view/services/media/game.service';
import { MovieService } from 'src/app/app-view/services/media/movie.service';
import { SeriesService } from 'src/app/app-view/services/media/serie.service';
import { TrackService } from 'src/app/app-view/services/media/track.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit {

  musics = [];
  movies = [];
  series = [];
  books = [];
  games = [];
  applications = [];

  internalError = 'An error was encountered during data recovery';

  constructor(private trackService: TrackService,
              private movieService: MovieService,
              private serieService: SeriesService,
              private bookService: BookService,
              private gameService: GameService,
              private applicationService: ApplicationService,
              public dialog: MatDialog,
              private errorService: ErrorService) {

    // Get popular tracks
    this.trackService.getPopularTracks()
      .then(response => {
        if (response.status === true) {
          this.musics = response.content;
        }
      })
      .then(() => {
        // Get popular movies
        this.movieService.getPopularMovies(1).then(response => {
          if (response.status === true) {
            this.movies = response.content;
          }
        })
        .then(() => {
          // Get popular series
          this.serieService.getPopularSeries().then(response => {
            if (response.status === true) {
              this.series = response.content;
            }
          })
          .then(() => {
            // Get popular books
            this.bookService.getPopularBooks(1).then(response => {
              if (response.status === true) {
                this.books = response.content;
              }
            })
            .then(() => {
              // Get popular games
              this.gameService.getPopularGames(1).then(response => {
                if (response.status === true) {
                  this.games = response.content;
                }
              })
              .then(() => {
                // Get popular applications
                this.applicationService.getPopularApplications().then(response => {
                  if (response.status === true) {
                    this.applications = response.content;
                  }
                });
              });
            });
          });
        });
      })
      .catch(
        () => {
          this.errorService.addError(this.internalError);
        }
      );
  }

  ngOnInit(): void {
  }


  openDialog(): void {
    this.dialog.open(DialogConfirmationComponent, {});
  }
}
