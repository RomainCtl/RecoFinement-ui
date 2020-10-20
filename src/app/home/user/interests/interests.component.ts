import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Observable, from } from 'rxjs';
import { ApplicationService } from 'src/app/services/media/application.service';
import { GameService } from 'src/app/services/media/game.service';
import { MovieService } from 'src/app/services/media/movie.service';
import { TrackService } from 'src/app/services/media/track.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private trackService: TrackService,
    private movieService: MovieService,
    private gameService: GameService,
    private appService: ApplicationService)
  {
    this.waitTrack = from(this.trackService.getGenres());
    this.waitMovie = from(this.movieService.getGenres());
    this.waitGame = from(this.gameService.getGenres());
    this.waitApp = from(this.appService.getGenres());
  }

  save = true;

  error: string;
  errorList = [];

  interestTrack: FormGroup = new FormGroup({});
  trackGenres = [];
  waitTrack: Observable<any>;

  interestMovie: FormGroup = new FormGroup({});
  movieGenres = [];
  waitMovie: Observable<any>;

  interestGame: FormGroup = new FormGroup({});
  gameGenres = [];
  waitGame: Observable<any>;

  interestApp: FormGroup = new FormGroup({});
  appGenres = [];
  waitApp: Observable<any>;

  ngOnInit(): void {
    this.waitTrack.subscribe(response => {
      this.trackGenres = response.content;
      for (const genre of this.trackGenres) {
        this.interestTrack.addControl(genre.name, new FormControl(false));
      }
    });
    this.waitMovie.subscribe(response => {
      this.movieGenres = response.content;
      for (const genre of this.movieGenres) {
        this.interestMovie.addControl(genre.name, new FormControl(false));
      }
    });
    this.waitGame.subscribe(response => {
      this.gameGenres = response.content;
      for (const genre of this.gameGenres) {
        this.interestGame.addControl(genre.name, new FormControl(false));
      }
    });
    this.waitApp.subscribe(response => {
      this.appGenres = response.content;
      for (const genre of this.appGenres) {
        this.interestApp.addControl(genre.name, new FormControl(false));
      }
    });
  }

  initSnack(media: string): MatSnackBarRef<TextOnlySnackBar> {
    const snack = this.snackBar.open(media + ' interests saved', 'UNDO', {
      duration: 2000,
    });
    snack.onAction().subscribe(() => {
      this.save = false;
    });
    return snack;
  }

  onTrackFormSubmit(): void {
    const snack = this.initSnack('Track');
    snack.afterDismissed().subscribe(() => {
      // TODO save in databases
      console.log(this.interestTrack.value);
      this.save = true;
    });
  }

  onMovieFormSubmit(): void {
    const snack = this.initSnack('Movie and serie');
    snack.afterDismissed().subscribe(() => {
      // TODO save in databases
      console.log(this.interestMovie.value);
      this.save = true;
    });
  }

  onGameFormSubmit(): void {
    const snack = this.initSnack('Game');
    snack.afterDismissed().subscribe(() => {
      // TODO save in databases
      console.log(this.interestGame.value);
      this.save = true;
    });
  }

  onAppFormSubmit(): void {
    const snack = this.initSnack('Application');
    snack.afterDismissed().subscribe(() => {
      // TODO save in databases
      console.log(this.interestApp.value);
      this.save = true;
    });
  }

  initErrorMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 10000,
      panelClass: ['custom-style']
    });
  }
}
