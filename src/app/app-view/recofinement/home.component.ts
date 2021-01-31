import { ApplicationResponseDto } from 'src/app/models/DtoResponse/applications/application-dto.model';
import { BookResponseDto } from 'src/app/models/DtoResponse/books/book-dto.model';
import { GameResponseDto } from 'src/app/models/DtoResponse/games/games.model';
import { ApplicationService } from './../services/media/application.service';
import { BookService } from 'src/app/app-view/services/media/book.service';
import { SeriesService } from 'src/app/app-view/services/media/serie.service';
import { MovieResponseDto } from 'src/app/models/DtoResponse/movies/movies.model';
import { MovieService } from './../services/media/movie.service';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/app-view/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TrackService } from '../services/media/track.service';
import { TrackHistoryResponseDto } from '../../models/DtoResponse/musics/track-history.model';
import { SliderHistoryComponent } from '../../shared-features/slider/slider-history/slider-history.component';
import { TrackResponseDto } from 'src/app/models/DtoResponse/musics/track-dto.model';
import { Track } from 'src/app/models/DtoResponse/musics/Track.model';
import { PopupComponent } from 'src/app/shared-features/modals/popup/popup.component';
import { PreviewComponent } from './musics/preview/preview.component';
import { GameService } from '../services/media/game.service';
import { SeriesResponseDto } from 'src/app/models/DtoResponse/series/series-dto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(SliderHistoryComponent) historySwiper: SliderHistoryComponent;

  constructor(
    private _auth: AuthService,
    private trackService: TrackService,
    private movieService: MovieService,
    private seriesService: SeriesService,
    private gameService: GameService,
    private bookService: BookService,
    private applicationService: ApplicationService,
    private bottom: MatBottomSheet,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {  }

  trackResponse: TrackHistoryResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  popularTracks: TrackResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  popularMovies: MovieResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  popularSeries: SeriesResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  popularGames: GameResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  popularBooks: BookResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  popularApplications: ApplicationResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  apiResponse = false;
  noTracks = true;

  ngOnInit(): void {
    this.trackService.getHistoryTracks(1).then((result: TrackHistoryResponseDto) => {
      this.trackResponse = result;
      this.apiResponse = true;
      if (result.number_of_elements !== 0) {
        this.noTracks = false;
      }
    });

    this.trackService.getPopularTracks().then((result: TrackResponseDto) => {
      this.popularTracks = result;
    });

    this.movieService.getPopularMovies().then((result: MovieResponseDto) => {
      this.popularMovies = result;
    });

    this.seriesService.getPopularSeries().then((result: SeriesResponseDto) => {
      this.popularSeries = result;
    });

    this.gameService.getPopularGames().then((result: GameResponseDto) => {
      this.popularGames = result;
    });

    this.bookService.getPopularBooks().then((result: BookResponseDto) => {
      this.popularBooks = result;
    });

    this.applicationService.getPopularApplications().then((result: ApplicationResponseDto) => {
      this.popularApplications = result;
    });

  }

  get tracksHistory(): TrackHistoryResponseDto {
    return this.trackResponse;
  }

  get authService(): AuthService {
    return this._auth;
  }

  openPreview(item: Track): void {

    this.bottom.open(PreviewComponent, {
      data: item,
      hasBackdrop: false,
      panelClass: ['shadow-none', 'bg-transparent', 'm-0', 'p-0'],
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      direction: 'ltr'
    });

  }

  openPopUp(item: Track): void {
    const popupDetails = this.dialog.open < PopupComponent,
      Track > (PopupComponent, {
        data: item,
        panelClass: ['shadow-none'],
        hasBackdrop: true,
        backdropClass: 'blur'
      });

      popupDetails.backdropClick().subscribe(() => {
        popupDetails.close();
      });
  
    }
}
