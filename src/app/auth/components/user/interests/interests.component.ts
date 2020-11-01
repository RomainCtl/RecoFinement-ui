import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Observable, from } from 'rxjs';
import { ErrorService } from 'src/app/services/error/error.service';
import { ApplicationService } from 'src/app/services/media/application.service';
import { GameService } from 'src/app/services/media/game.service';
import { MovieService } from 'src/app/services/media/movie.service';
import { SerieService } from 'src/app/services/media/serie.service';
import { TrackService } from 'src/app/services/media/track.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  save = true;

  trackLimit = 16;
  movieLimit = 16;
  serieLimit = 16;
  gameLimit = 16;
  appLimit = 16;

  error: boolean;

  myGenreLiked = [];

  interestTrack: FormGroup = new FormGroup({});
  trackGenres = [];
  waitTrack: Observable<any>;

  interestMovie: FormGroup = new FormGroup({});
  movieGenres = [];
  waitMovie: Observable<any>;

  interestSerie: FormGroup = new FormGroup({});
  serieGenres = [];
  waitSerie: Observable<any>;

  interestGame: FormGroup = new FormGroup({});
  gameGenres = [];
  waitGame: Observable<any>;

  interestApp: FormGroup = new FormGroup({});
  appGenres = [];
  waitApp: Observable<any>;

  constructor(
    private snackBar: MatSnackBar,
    private trackService: TrackService,
    private movieService: MovieService,
    private serieService: SerieService,
    private gameService: GameService,
    private appService: ApplicationService,
    private userService: UserService,
    private errorService: ErrorService)
  {
    this.waitTrack = from(this.trackService.getGenres());
    this.waitMovie = from(this.movieService.getGenres());
    this.waitSerie = from(this.serieService.getGenres());
    this.waitGame = from(this.gameService.getGenres());
    this.waitApp = from(this.appService.getGenres());
  }

  ngOnInit(): void {
    this.getMyLikedGenre().then(() => {

      this.waitTrack.subscribe(track => {
        this.trackGenres = track.content;
        this.sortArray(this.trackGenres);
        for (const genre of this.trackGenres) {
          this.interestTrack.addControl(genre.genre_id, new FormControl(this.myGenreLiked.find(e => e.genre_id === +genre.genre_id)));
        }
      },
      error => {
        this.error = true;
        this.initErrorMessage('The recovery of genres for tracks failed.');
        console.error(error);
      });
      this.waitMovie.subscribe(movie => {
        this.movieGenres = movie.content;
        this.sortArray(this.movieGenres);
        for (const genre of this.movieGenres) {
          this.interestMovie.addControl(genre.genre_id, new FormControl(this.myGenreLiked.find(e => e.genre_id === +genre.genre_id)));
        }
      },
        error => {
          this.error = true;
          this.initErrorMessage('The recovery of genres for movies failed.');
          console.error(error);
        }
      );
      this.waitSerie.subscribe(serie => {
        this.serieGenres = serie.content;
        this.sortArray(this.serieGenres);
        for (const genre of this.serieGenres) {
          this.interestSerie.addControl(genre.genre_id, new FormControl(this.myGenreLiked.find(e => e.genre_id === +genre.genre_id)));
        }
      },
        error => {
          this.error = true;
          this.initErrorMessage('The recovery of genres for series failed.');
          console.error(error);
        }
      );
      this.waitGame.subscribe(game => {
        this.gameGenres = game.content;
        this.sortArray(this.gameGenres);
        for (const genre of this.gameGenres) {
          this.interestGame.addControl(genre.genre_id, new FormControl(this.myGenreLiked.find(e => e.genre_id === +genre.genre_id)));
        }
      },
      error => {
        this.error = true;
        this.initErrorMessage('The recovery of genres for series failed.');
        console.error(error);
      });
      this.waitApp.subscribe(app => {
        this.appGenres = app.content;
        this.sortArray(this.appGenres);
        for (const genre of this.appGenres) {
          this.interestApp.addControl(genre.genre_id, new FormControl(this.myGenreLiked.find(e => e.genre_id === +genre.genre_id)));
        }
      },
      error => {
        this.error = true;
        this.initErrorMessage('The recovery of genres for applications failed.');
        console.error(error);
      });
    });
  }

  initSnack(media: string): MatSnackBarRef<TextOnlySnackBar> {
    const snack = this.snackBar.open(media + ' interests saved', 'UNDO', {
      duration: 2000,
      horizontalPosition: 'end'
    });
    snack.onAction().subscribe(() => {
      this.save = false;
    });
    return snack;
  }

  onTrackFormSubmit(): void {
    const snack = this.initSnack('Track');
    snack.afterDismissed().subscribe(() => {
      this.saveGenre(this.interestTrack);
      this.save = true;
    });
  }

  onMovieFormSubmit(): void {
    const snack = this.initSnack('Movie');
    snack.afterDismissed().subscribe(() => {
      this.saveGenre(this.interestMovie);
      this.save = true;
    });
  }

  onSerieFormSubmit(): void {
    const snack = this.initSnack('Serie');
    snack.afterDismissed().subscribe(() => {
      this.saveGenre(this.interestSerie);
      this.save = true;
    });
  }

  onGameFormSubmit(): void {
    const snack = this.initSnack('Game');
    snack.afterDismissed().subscribe(() => {
      this.saveGenre(this.interestGame);
      this.save = true;
    });
  }

  onAppFormSubmit(): void {
    const snack = this.initSnack('Application');
    snack.afterDismissed().subscribe(() => {
      this.saveGenre(this.interestApp);
      this.save = true;
    });
  }

  initErrorMessage(msg: string): void {
    this.errorService.addError(msg);
  }

  getMyLikedGenre(): Promise<any> {
    return this.userService.getGenre().then((res) => {
      this.myGenreLiked = res.content;
    });
  }

  saveGenre(formRes: FormGroup): void {
    if (this.save) {
      for (const genreId of Object.keys(formRes.value)) {
        if (formRes.value[genreId]) {
          if (!this.myGenreLiked.find(e => e.genre_id === +genreId)) {
            this.userService.postGenre(+genreId).then(() =>
              this.getMyLikedGenre()
            );
          }
        } else {
          if (this.myGenreLiked.find(e => e.genre_id === +genreId)) {
            this.userService.deleteGenre(+genreId).then(() =>
              this.getMyLikedGenre()
            );
          }
        }
      }
    }
  }

  showMoreTracks(): void {
    this.trackLimit = Number(this.trackLimit) + (this.trackGenres.length - 16);
  }
  showLessTracks(): void {
    this.trackLimit = Number(this.trackLimit) - (this.trackGenres.length - 16);
  }

  showMoreMovies(): void {
    this.movieLimit = Number(this.movieLimit) + (this.movieGenres.length - 16);
  }
  showLessMovies(): void {
    this.movieLimit = Number(this.movieLimit) - (this.movieGenres.length - 16);
  }

  showMoreSeries(): void {
    this.serieLimit = Number(this.serieLimit) + (this.serieGenres.length - 16);
  }
  showLessSeries(): void {
    this.serieLimit = Number(this.serieLimit) - (this.serieGenres.length - 16);
  }

  showMoreGames(): void {
    this.gameLimit = Number(this.gameLimit) + (this.gameGenres.length - 16);
  }
  showLessGames(): void {
    this.gameLimit = Number(this.gameLimit) - (this.gameGenres.length - 16);
  }

  showMoreApps(): void {
    this.appLimit = Number(this.appLimit) + (this.appGenres.length - 16);
  }
  showLessApps(): void {
    this.appLimit = Number(this.appLimit) - (this.appGenres.length - 16);
  }

  sortArray(array: any[]): void {
    array.sort( (a, b) => {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
}
