import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { ApplicationService } from 'src/app/app-view/services/media/application.service';
import { BookService } from 'src/app/app-view/services/media/book.service';
import { GameService } from 'src/app/app-view/services/media/game.service';
import { MovieService } from 'src/app/app-view/services/media/movie.service';
import { TrackService } from 'src/app/app-view/services/media/track.service';
import { CreateSerieDtoRequest } from 'src/app/models/DtoRequest/add-media/create_serie.model';
import { ApplicationResponseDto } from 'src/app/models/DtoResponse/applications/application-dto.model';
import { Application } from 'src/app/models/DtoResponse/applications/application.model';
import { BookResponseDto } from 'src/app/models/DtoResponse/books/book-dto.model';
import { Book } from 'src/app/models/DtoResponse/books/Book.model';
import { Game } from 'src/app/models/DtoResponse/games/Game.model';
import { GameResponseDto } from 'src/app/models/DtoResponse/games/games.model';
import { Movie } from 'src/app/models/DtoResponse/movies/Movie.model';
import { MovieResponseDto } from 'src/app/models/DtoResponse/movies/movies.model';
import { TrackResponseDto } from 'src/app/models/DtoResponse/musics/track-dto.model';
import { Track } from 'src/app/models/DtoResponse/musics/Track.model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeAdminComponent {

  columnsToDisplayTrack: string[] = ['title', 'artist_name'];
  columnsToDisplayMovie: string[] = ['title', 'director'];
  columnsToDisplaySerie: string[] = ['title', 'writers'];
  columnsToDisplayBook: string[] = ['title', 'author'];
  columnsToDisplayGame: string[] = ['name', 'publishers'];
  columnsToDisplayApps: string[] = ['name', 'current_version'];

  dataSourceTrack = new MatTableDataSource<Track>([]);
  dataSourceMovie = new MatTableDataSource<Movie>([]);
  dataSourceSerie = new MatTableDataSource<CreateSerieDtoRequest>([]);
  dataSourceGame = new MatTableDataSource<Game>([]);
  dataSourceBook = new MatTableDataSource<Book>([]);
  dataSourceApplication = new MatTableDataSource<Application>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  expandedElementTrack: Track | null;
  expandedElementMovie: Movie | null;
  expandedElementSerie: CreateSerieDtoRequest | null;
  expandedElementBook: Book | null;
  expandedElementGame: Game | null;
  expandedElementApplication: Application | null;

  constructor(
    public snackBar: MatSnackBar,
    private trackService: TrackService,
    private movieService: MovieService,
    private gameService: GameService,
    private bookService: BookService,
    private appService: ApplicationService
  ) {
    this.getTrackToValidate();
    this.getMovieToValidate();
    this.getBookToValidate();
    this.getGameToValidate();
    this.getAppToValidate();
  }

  getTrackToValidate(): void {
    this.trackService.getTrackToValidate().then((track: TrackResponseDto) => {
      this.dataSourceTrack = new MatTableDataSource<Track>(track.content);
      this.dataSourceTrack.paginator = this.paginator;
    });
  }

  acceptTrack(trackid: number): void {
    this.trackService.acceptTrackToAdd(trackid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getTrackToValidate();
    });
  }

  refuseTrack(trackid: number): void {
    this.trackService.refuseTrackToAdd(trackid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getTrackToValidate();
    });
  }

  getMovieToValidate(): void {
    this.movieService.getMovieToValidate().then((movie: MovieResponseDto) => {
      this.dataSourceMovie = new MatTableDataSource<Movie>(movie.content);
      this.dataSourceMovie.paginator = this.paginator;
    });
  }

  acceptMovie(movieid: number): void {
    this.movieService.acceptMovieToAdd(movieid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getMovieToValidate();
    });
  }

  refuseMovie(movieid: number): void {
    this.movieService.refuseMovieToAdd(movieid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getMovieToValidate();
    });
  }

  getBookToValidate(): void {
    this.bookService.getBookToValidate().then((book: BookResponseDto) => {
      this.dataSourceBook = new MatTableDataSource<Book>(book.content);
      this.dataSourceBook.paginator = this.paginator;
    });
  }

  acceptBook(bookid: number): void {
    this.bookService.acceptBookToAdd(bookid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getBookToValidate();
    });
  }

  refuseBook(bookid: number): void {
    this.bookService.refuseBookToAdd(bookid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getBookToValidate();
    });
  }

  getGameToValidate(): void {
    this.gameService.getGameToValidate().then((game: GameResponseDto) => {
      this.dataSourceGame = new MatTableDataSource<Game>(game.content);
      this.dataSourceGame.paginator = this.paginator;
    });
  }

  acceptGame(gameid: number): void {
    this.gameService.acceptGameToAdd(gameid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getGameToValidate();
    });
  }

  refuseGame(gameid: number): void {
    this.gameService.refuseGameToAdd(gameid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getGameToValidate();
    });
  }

  getAppToValidate(): void {
    this.appService.getAppsToValidate().then((app: ApplicationResponseDto) => {
      this.dataSourceApplication = new MatTableDataSource<Application>(app.content);
      this.dataSourceApplication.paginator = this.paginator;
    });
  }

  acceptApplication(appid: number): void {
    this.appService.acceptAppToAdd(appid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getAppToValidate();
    });
  }

  refuseApplication(appid: number): void {
    this.appService.refuseAppToAdd(appid).then((response: any) => {
      this.snackBar.open(response.message, 'Alright!', {duration: 5000});
      this.getAppToValidate();
    });
  }
}
