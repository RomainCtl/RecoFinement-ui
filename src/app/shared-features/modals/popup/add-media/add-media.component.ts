import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationService } from 'src/app/app-view/services/media/application.service';
import { BookService } from 'src/app/app-view/services/media/book.service';
import { GameService } from 'src/app/app-view/services/media/game.service';
import { MovieService } from 'src/app/app-view/services/media/movie.service';
import { SeriesService } from 'src/app/app-view/services/media/serie.service';
import { TrackService } from 'src/app/app-view/services/media/track.service';
import { CreateApplicationDtoRequest } from 'src/app/models/DtoRequest/add-media/create_app.model';
import { CreateBookDtoRequest } from 'src/app/models/DtoRequest/add-media/create_book.model';
import { CreateGameDtoRequest } from 'src/app/models/DtoRequest/add-media/create_game.model';
import { CreateMovieDtoRequest } from 'src/app/models/DtoRequest/add-media/create_movie.model';
import { CreateSerieDtoRequest } from 'src/app/models/DtoRequest/add-media/create_serie.model';
import { CreateTrackDtoRequest } from 'src/app/models/DtoRequest/add-media/create_track.model';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {

  genres = [];
  selectedGenres = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public item: any,
    public dialogRef: MatDialogRef<AddMediaComponent>,
    private trackService: TrackService,
    private movieService: MovieService,
    private serieService: SeriesService,
    private bookService: BookService,
    private gameService: GameService,
    private appService: ApplicationService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.item.artist_name === "") {
      this.trackService.getGenres().then((genres) => {
        this.genres = genres.content.sort(this.compare);
        this.selectedGenres = this.genres;
      });
    }
    if (this.item.language === "") {
      this.movieService.getGenres().then((genres) => {
          this.genres = genres.content.sort(this.compare);
          this.selectedGenres = this.genres;
      })
    }
    if (this.item.current_version === "") {
      this.appService.getGenres().then((genres) => {
          this.genres = genres.content.sort(this.compare);
          this.selectedGenres = this.genres;
      })
    }
    if (this.item.developers === "") {
      this.gameService.getGenres().then((genres) => {
          this.genres = genres.content.sort(this.compare);
          this.selectedGenres = this.genres;
      })
    }
  }

  onKey(value) {
    this.selectedGenres = this.search(value).sort(this.compare);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.genres.filter(option => option.name.toLowerCase().includes(filter)).sort(this.compare);
  }

  addTrack(values: CreateTrackDtoRequest): void {
    values.year = +values.year;
    values.spotify_id = +values.spotify_id;

    if (values.title !== undefined || values.genres.length !== 0) {
      this.trackService.postNewTrack(values).then((result) => {
        this.dialogRef.close();
        this.snackBar.open(result.message, 'Alright!', {duration: 5000});
      })
    } else {
      this.snackBar.open('Required fields are missing', '', {duration: 5000});
    }
  }

  addMovie(values: CreateMovieDtoRequest): void {
    this.movieService.postNewMovie(values).then((result) => {
      this.dialogRef.close();
      this.snackBar.open(result.message, 'Alright!', {duration: 5000});
    })
  }

  addSerie(values: CreateSerieDtoRequest): void {
    this.serieService.postNewSerie(values).then((result) => {
      this.dialogRef.close();
      this.snackBar.open(result.message, 'Alright!', {duration: 5000});
    })
  }

  addBook(values: CreateBookDtoRequest): void {
    values.year_of_publication = +values.year_of_publication;
    this.bookService.postNewBook(values).then((result) => {
      this.dialogRef.close();
      this.snackBar.open(result.message, 'Alright!', {duration: 5000});

    })
  }

  addGame(values: CreateGameDtoRequest): void {
    values.steamid = +values.steamid;
    this.gameService.postNewGame(values).then((result) => {
      this.dialogRef.close();
      this.snackBar.open(result.message, 'Alright!', {duration: 5000});
    })
  }

  addApplication(values: CreateApplicationDtoRequest): void {
    this.appService.postNewApp(values).then((result) => {
      this.dialogRef.close();
      this.snackBar.open(result.message, 'Alright!', {duration: 5000});
    })
  }

  compare(a, b): any {
    const bandA = a.name.toUpperCase();
    const bandB = b.name.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
}
