import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationService } from 'src/app/app-view/services/media/application.service';
import { BookService } from 'src/app/app-view/services/media/book.service';
import { GameService } from 'src/app/app-view/services/media/game.service';
import { MovieService } from 'src/app/app-view/services/media/movie.service';
import { SeriesService } from 'src/app/app-view/services/media/serie.service';
import { TrackService } from 'src/app/app-view/services/media/track.service';
import { ProfileService } from 'src/app/dashboard-view/services/profile/profile.service';
import { SocketService } from '../../services/socket.service';
import { PopupContentComponent } from './popup-content/popup-content.component';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  new_profilename= "";
  genre_track = [];
  genre_movie = [];
  genre_serie = [];
  genre_game = [];
  genre_app = [];

  mode: string;
  printMode:string;

  genresTrack = [];
  preselectGenresTrack = [];
  selectedGenresTrack = [];
  trackGenreForm: FormControl;

  genresMovie = [];
  selectedGenresMovie = [];
  preselectGenresMovie = [];
  movieGenreForm: FormControl;

  genresSerie = [];
  selectedGenresSerie = [];
  preselectGenresSerie = [];
  serieGenreForm: FormControl;

  genresGame = [];
  selectedGenresGame = [];
  preselectGenresGame = [];
  gameGenreForm: FormControl;

  genresApplication = [];
  selectedGenresApplication = [];
  preselectGenresApplication = [];
  applicationGenreForm: FormControl;

  listProfiles: any[];
  selectedProfile: any;

  displayedColumnsContent: string[] = ['type', 'Rating', 'Review', 'Count'];

  displayedColumnsTrackReco: string[] = ['music', 'artist_name', 'rating', 'score'];
  displayedColumnsMovieReco: string[] = ['movie', 'writer', 'rating', 'score'];
  displayedColumnsSerieReco: string[] = ['serie', 'writers', 'rating', 'score'];
  displayedColumnsBookReco: string[] = ['book', 'publisher', 'rating', 'score'];
  displayedColumnsGameReco: string[] = ['game', 'developers', 'rating', 'score'];
  displayedColumnsApplicationReco: string[] = ['application', 'current_version', 'rating', 'score'];

  dataSourceTrackRecommendation:MatTableDataSource<any>;
  dataSourceMovieRecommendation:MatTableDataSource<any>;
  dataSourceSerieRecommendation:MatTableDataSource<any>;
  dataSourceBookRecommendation:MatTableDataSource<any>;
  dataSourceGameRecommendation:MatTableDataSource<any>;
  dataSourceApplicationRecommendation:MatTableDataSource<any>;

  trackMeta: any[];
  movieMeta: any[];
  serieMeta: any[];
  gameMeta: any[];
  bookMeta: any[];
  applicationMeta: any[];

  dataSourceTrack: MatTableDataSource<any>;
  dataSourceMovie: MatTableDataSource<any>;
  dataSourceSerie: MatTableDataSource<any>;
  dataSourceGame: MatTableDataSource<any>;
  dataSourceBook: MatTableDataSource<any>;
  dataSourceApplication: MatTableDataSource<any>;

  historyRunning: any[];
  historySelected: any;

  constructor(
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private trackService: TrackService,
    private movieService: MovieService,
    private serieService: SeriesService,
    private gameService: GameService,
    private bookService: BookService,
    private profileService: ProfileService,
    private socketService: SocketService,
    private applicationService: ApplicationService
    ) {
      this.printMode = "";
      this.trackMeta = [];

      this.dataSourceTrackRecommendation = new MatTableDataSource([]);
      this.dataSourceMovieRecommendation = new MatTableDataSource([]);
      this.dataSourceSerieRecommendation = new MatTableDataSource([]);
      this.dataSourceGameRecommendation = new MatTableDataSource([]);
      this.dataSourceBookRecommendation = new MatTableDataSource([]);
      this.dataSourceApplicationRecommendation = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.getProfiles();
    this.getAllGenres();
    this.resetForm();
  }

  ngAfterViewInit(): void {
    this.dataSourceTrackRecommendation.paginator = this.paginator;
    this.dataSourceMovieRecommendation.paginator = this.paginator;
    this.dataSourceSerieRecommendation.paginator = this.paginator;
    this.dataSourceGameRecommendation.paginator = this.paginator;
    this.dataSourceBookRecommendation.paginator = this.paginator;
    this.dataSourceApplicationRecommendation.paginator = this.paginator;
  }

  getAllGenres(): void {
    this.trackService.getGenres().then((genres: any) => {
      this.genresTrack = genres.content.sort(this.compare);
      this.selectedGenresTrack = this.genresTrack;
    });
    this.movieService.getGenres().then((genres: any) => {
      this.genresMovie = genres.content.sort(this.compare);
      this.selectedGenresMovie = this.genresMovie;
    });
    this.serieService.getGenres().then((genres: any) => {
      this.genresSerie = genres.content.sort(this.compare);
      this.selectedGenresSerie= this.genresSerie;
    });
    this.gameService.getGenres().then((genres: any) => {
      this.genresGame = genres.content.sort(this.compare);
      this.selectedGenresGame = this.genresGame;
    });
    this.applicationService.getGenres().then((genres: any) => {
      this.genresApplication = genres.content.sort(this.compare);
      this.selectedGenresApplication = this.genresApplication;
    });
  }

  onKeyTrack(value) {
    this.selectedGenresTrack = this.searchTrack(value).sort(this.compare);
  }

  searchTrack(value: string) {
    let filter = value.toLowerCase();
    return this.genresTrack.filter(option => option.name.toLowerCase().includes(filter)).sort(this.compare);
  }

  onKeyMovie(value) {
    this.selectedGenresMovie = this.searchTrack(value).sort(this.compare);
  }

  searchMovie(value: string) {
    let filter = value.toLowerCase();
    return this.genresMovie.filter(option => option.name.toLowerCase().includes(filter)).sort(this.compare);
  }

  onKeySerie(value) {
    this.selectedGenresSerie = this.searchTrack(value).sort(this.compare);
  }

  searchSerie(value: string) {
    let filter = value.toLowerCase();
    return this.genresSerie.filter(option => option.name.toLowerCase().includes(filter)).sort(this.compare);
  }

  onKeyGame(value) {
    this.selectedGenresGame= this.searchTrack(value).sort(this.compare);
  }

  searchGame(value: string) {
    let filter = value.toLowerCase();
    return this.genresGame.filter(option => option.name.toLowerCase().includes(filter)).sort(this.compare);
  }

  onKeyApps(value) {
    this.selectedGenresApplication = this.searchTrack(value).sort(this.compare);
  }

  searchApps(value: string) {
    let filter = value.toLowerCase();
    return this.genresApplication.filter(option => option.name.toLowerCase().includes(filter)).sort(this.compare);
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

  getProfiles(): void {
    this.profileService.getListProfile().then((list: any) => {
      this.listProfiles = list.content;
    });
  }

  createProfile(): void {
    if(this.mode === 'Create') {
      this.profileService.createNewProfile(this.new_profilename).then((res) => {
        if(this.trackGenreForm.value.length !== 0 ) {
          for(let genre of this.trackGenreForm.value) {
            this.profileService.addGenreToProfile(res.profile.uuid, genre);
          }
        }
        if(this.movieGenreForm.value.length !== 0 ) {
          for(let genre of this.movieGenreForm.value) {
            this.profileService.addGenreToProfile(res.profile.uuid, genre);
          }
        }
        if(this.serieGenreForm.value.length !== 0 ) {
          for(let genre of this.serieGenreForm.value) {
            this.profileService.addGenreToProfile(res.profile.uuid, genre);
          }
        }
        if(this.gameGenreForm.value.length !== 0 ) {
          for(let genre of this.gameGenreForm.value) {
            this.profileService.addGenreToProfile(res.profile.uuid, genre);
          }
        }
        if(this.applicationGenreForm.value.length !== 0 ) {
          for(let genre of this.applicationGenreForm.value) {
            this.profileService.addGenreToProfile(res.profile.uuid, genre);
          }
        }
        this.resetForm();
        this.getProfiles();
      });
    } else if(this.mode === 'Edit') {
      this.profileService.editProfile(this.selectedProfile.uuid, this.new_profilename).then(() => {
        this.profileService.getGenreToProfile(this.selectedProfile.uuid).then((res) => {
          let genres = res.content;
          let new_genres = this.trackGenreForm.value.concat(this.movieGenreForm.value).concat(this.serieGenreForm.value).concat(this.gameGenreForm.value).concat(this.applicationGenreForm.value);

          for(let genre of new_genres) {
            if (!genres.find(elem => elem.genre_id === genre)) {
              this.profileService.addGenreToProfile(this.selectedProfile.uuid, genre);
            }
          }
          for(let genre of genres) {
            if (!new_genres.find(elem => elem === genre.genre_id)) {
              this.profileService.deleteGenreToProfile(this.selectedProfile.uuid, genre.genre_id);
            }
          }

          this.resetForm();
          this.getProfiles();
        });
      });
    } else {
      this.snackbar.open('Name is required', '', {
        duration: 3000,
        horizontalPosition: 'start'
      });
    }
  }

  editProfile(element: any): void {
    this.selectedProfile = element;

    this.profileService.getGenreToProfile(element.uuid).then((res) => {
      this.trackService.getGenres().then((genres: any) => {
        for(let genre of res.content) {
          if(genres.content.find(elem => elem.genre_id === genre.genre_id)) {
            this.preselectGenresTrack.push(genre.genre_id);
          }
        }
        this.trackGenreForm = new FormControl(this.preselectGenresTrack);
      });
      this.movieService.getGenres().then((genres: any) => {
        for(let genre of res.content) {
          if(genres.content.find(elem => elem.genre_id === genre.genre_id)) {
            this.preselectGenresMovie.push(genre.genre_id);
          }
        }
        this.movieGenreForm = new FormControl(this.preselectGenresMovie);
      });
      this.serieService.getGenres().then((genres: any) => {
        for(let genre of res.content) {
          if(genres.content.find(elem => elem.genre_id === genre.genre_id)) {
            this.preselectGenresSerie.push(genre.genre_id);
          }
        }
        this.serieGenreForm = new FormControl(this.preselectGenresSerie);
      });
      this.gameService.getGenres().then((genres: any) => {
        for(let genre of res.content) {
          if(genres.content.find(elem => elem.genre_id === genre.genre_id)) {
            this.preselectGenresGame.push(genre.genre_id);
          }
        }
        this.gameGenreForm = new FormControl(this.preselectGenresGame);
      });
      this.applicationService.getGenres().then((genres: any) => {
        for(let genre of res.content) {
          if(genres.content.find(elem => elem.genre_id === genre.genre_id)) {
            this.preselectGenresApplication.push(genre.genre_id);
          }
        }
        this.applicationGenreForm = new FormControl(this.preselectGenresApplication);
      });
    });
    this.mode = "Edit";
    this.new_profilename = element.profilename;
  }

  deleteProfile(uuid: string): void {
    this.profileService.deleteProfile(uuid).then(() => {
      this.printMode = "";
      this.resetForm();
      this.getProfiles();
    });
  }

  contentsProfile(profile: any): void {
    this.selectedProfile = profile;
    this.printMode = 'Contents';

    this.getMetaTrack();
    this.getMetaMovie();
    this.getMetaSerie();
    this.getMetaBook();
    this.getMetaGame();
    this.getMetaApp();
  }

  historyProfile(profile: any): void {
    this.selectedProfile = profile;
    this.historySelected = null;
    this.printMode = 'History';

    this.getHistoryRunning();
  }

  getHistoryRunning(): void {
    this.profileService.getExecutionHistory(this.selectedProfile.uuid).then((res) => {
      this.historyRunning = res.content;
    });
  }

  selectHistory(): void {
    this.trackService.getHistoryTrackToProfile(this.selectedProfile.uuid, this.historySelected).then((res) => {
      this.dataSourceTrackRecommendation.data = res.content;
      setTimeout(() => this.dataSourceTrackRecommendation.paginator = this.paginator);
    });
    this.movieService.getHistoryMovieToProfile(this.selectedProfile.uuid, this.historySelected).then((res) => {
      this.dataSourceMovieRecommendation.data = res.content;
      setTimeout(() => this.dataSourceMovieRecommendation.paginator = this.paginator);
    });
    this.serieService.getHistorySerieToProfile(this.selectedProfile.uuid, this.historySelected).then((res) => {
      this.dataSourceSerieRecommendation.data = res.content;
      setTimeout(() => this.dataSourceSerieRecommendation.paginator = this.paginator);
    });
    this.gameService.getHistoryGameToProfile(this.selectedProfile.uuid, this.historySelected).then((res) => {
      this.dataSourceGameRecommendation.data = res.content;
      setTimeout(() => this.dataSourceGameRecommendation.paginator = this.paginator);
    });
    this.bookService.getHistoryBookToProfile(this.selectedProfile.uuid, this.historySelected).then((res) => {
      this.dataSourceBookRecommendation.data = res.content;
      setTimeout(() => this.dataSourceBookRecommendation.paginator = this.paginator);
    });
    this.applicationService.getHistoryApplicationToProfile(this.selectedProfile.uuid, this.historySelected).then((res) => {
      this.dataSourceApplicationRecommendation.data = res.content;
      setTimeout(() => this.dataSourceApplicationRecommendation.paginator = this.paginator);
    });
  }

  resetForm(): void {
    this.mode = "Create";

    this.trackGenreForm = new FormControl([]);
    this.movieGenreForm = new FormControl([]);
    this.serieGenreForm = new FormControl([]);
    this.gameGenreForm = new FormControl([]);
    this.applicationGenreForm = new FormControl([]);

    this.preselectGenresTrack = [];
    this.preselectGenresMovie = [];
    this.preselectGenresSerie = [];
    this.preselectGenresGame = [];
    this.preselectGenresApplication = [];

    this.new_profilename = "";
  }

  applyFilterTrack(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTrack.filter = filterValue.trim().toLowerCase();
  }

  applyFilterMovie(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMovie.filter = filterValue.trim().toLowerCase();
  }

  applyFilterSerie(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSerie.filter = filterValue.trim().toLowerCase();
  }

  applyFilterGame(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceGame.filter = filterValue.trim().toLowerCase();
  }

  applyFilterBook(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceBook.filter = filterValue.trim().toLowerCase();
  }

  applyFilterApp(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceApplication.filter = filterValue.trim().toLowerCase();
  }

  getMetaTrack(): void {
    this.trackService.getTrackToProfile(this.selectedProfile.uuid).then((res) => {
      this.trackMeta = res.content;
      this.dataSourceTrack = new MatTableDataSource(this.trackMeta);
    });
  }

  getMetaMovie(): void {
    this.movieService.getMovieToProfile(this.selectedProfile.uuid).then((res) => {
      this.movieMeta = res.content;
      this.dataSourceMovie = new MatTableDataSource(this.movieMeta);
    });
  }

  getMetaSerie(): void {
    this.serieService.getSerieToProfile(this.selectedProfile.uuid).then((res) => {
      this.serieMeta = res.content;
      this.dataSourceSerie = new MatTableDataSource(this.serieMeta);
    });
  }

  getMetaBook(): void {
    this.bookService.getBookToProfile(this.selectedProfile.uuid).then((res) => {
      this.bookMeta = res.content;
      this.dataSourceBook = new MatTableDataSource(this.bookMeta);
    });
  }

  getMetaGame(): void {
    this.gameService.getGameToProfile(this.selectedProfile.uuid).then((res) => {
      this.gameMeta = res.content;
      this.dataSourceGame = new MatTableDataSource(this.gameMeta);
    });
  }

  getMetaApp(): void {
    this.applicationService.getApplicationToProfile(this.selectedProfile.uuid).then((res) => {
      this.applicationMeta = res.content;
      this.dataSourceApplication = new MatTableDataSource(this.applicationMeta);
    });
  }

  searchDialog(): void {
    const popupDetails = this.dialog.open < PopupContentComponent, any> (PopupContentComponent, {
        data: this.selectedProfile,
        panelClass: ['shadow-none', 'w-75', 'h-75'],
        hasBackdrop: true,
        backdropClass: 'blur'
      });

      popupDetails.backdropClick().subscribe(() => {
        popupDetails.close();
      });

      popupDetails.afterClosed().subscribe(() => {
        this.getMetaTrack();
        this.getMetaMovie();
        this.getMetaSerie();
        this.getMetaBook();
        this.getMetaGame();
        this.getMetaApp();
      });
  }

  saveMetaRate(event: any, element: any) {
    let content_id = null;
    if (element.track) {
      content_id = element.track.content_id;
    } else if (element.movie) {
      content_id = element.movie.content_id;
    } else if (element.serie) {
      content_id = element.serie.content_id;
    } else if (element.book) {
      content_id = element.book.content_id;
    } else if (element.game) {
      content_id = element.game.content_id;
    } else if (element.application) {
      content_id = element.application.content_id;
    }

    this.profileService.putNewMetaToProfile(this.selectedProfile.uuid, content_id,
      {
        "rating": event,
        "last_rating_date": new Date(),
        "review_see_count": element.review_see_count,
        "last_review_see_date": element.last_review_see_date,
        "count": element.count,
        "last_count_increment": element.last_count_increment
      }
    ).then(() => {
      this.getMetaTrack();
      this.getMetaMovie();
      this.getMetaSerie();
      this.getMetaBook();
      this.getMetaGame();
      this.getMetaApp();
    })
  }

  saveMetaReview(event: any, element: any) {
    let content_id = null;
    if (element.track) {
      content_id = element.track.content_id;
    } else if (element.movie) {
      content_id = element.movie.content_id;
    } else if (element.serie) {
      content_id = element.serie.content_id;
    } else if (element.book) {
      content_id = element.book.content_id;
    } else if (element.game) {
      content_id = element.game.content_id;
    } else if (element.application) {
      content_id = element.application.content_id;
    }

    this.profileService.putNewMetaToProfile(this.selectedProfile.uuid, content_id,
      {
        "rating": element.rating,
        "last_rating_date": element.last_rating_date,
        "review_see_count": event,
        "last_review_see_date": new Date(),
        "count": element.count,
        "last_count_increment": element.last_count_increment
      }
    ).then(() => {
      this.getMetaTrack();
      this.getMetaMovie();
      this.getMetaSerie();
      this.getMetaBook();
      this.getMetaGame();
      this.getMetaApp();
    })
  }

  saveMetaCount(event: any, element: any) {
    let content_id = null;
    if (element.track) {
      content_id = element.track.content_id;
    } else if (element.movie) {
      content_id = element.movie.content_id;
    } else if (element.serie) {
      content_id = element.serie.content_id;
    } else if (element.book) {
      content_id = element.book.content_id;
    } else if (element.game) {
      content_id = element.game.content_id;
    } else if (element.application) {
      content_id = element.application.content_id;
    }

    this.profileService.putNewMetaToProfile(this.selectedProfile.uuid, content_id,
      {
        "rating": element.rating,
        "last_rating_date": element.last_rating_date,
        "review_see_count": element.review_see_count,
        "last_review_see_date": element.last_review_see_date,
        "count": event,
        "last_count_increment": new Date()
      }
    ).then(() => {
      this.getMetaTrack();
      this.getMetaMovie();
      this.getMetaSerie();
      this.getMetaBook();
      this.getMetaGame();
      this.getMetaApp();
    })
  }

  startRecommendations(uuid: string) {
    this.socketService.startRecommendations(uuid);
  }

}
