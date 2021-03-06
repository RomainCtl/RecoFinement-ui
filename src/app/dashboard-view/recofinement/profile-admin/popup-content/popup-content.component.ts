import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApplicationService } from 'src/app/app-view/services/media/application.service';
import { BookService } from 'src/app/app-view/services/media/book.service';
import { GameService } from 'src/app/app-view/services/media/game.service';
import { MovieService } from 'src/app/app-view/services/media/movie.service';
import { SeriesService } from 'src/app/app-view/services/media/serie.service';
import { TrackService } from 'src/app/app-view/services/media/track.service';
import { ProfileService } from 'src/app/dashboard-view/services/profile/profile.service';
import { ApplicationResponseDto } from 'src/app/models/DtoResponse/applications/application-dto.model';
import { BookResponseDto } from 'src/app/models/DtoResponse/books/book-dto.model';
import { GameResponseDto } from 'src/app/models/DtoResponse/games/games.model';
import { MovieResponseDto } from 'src/app/models/DtoResponse/movies/movies.model';
import { TrackResponseDto } from 'src/app/models/DtoResponse/musics/track-dto.model';
import { SeriesResponseDto } from 'src/app/models/DtoResponse/series/series-dto.model';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.scss']
})
export class PopupContentComponent implements OnInit {

  mediaSelected: string = 'No media';
  searchEmpty : boolean = true;
  searchActivated : boolean = false;
  searchValue : string = '';


  series = {
    pageIndex: 0,
    finished: false,
    tabVisited: false
  }

  movies = {
    pageIndex: 0,
    finished: false,
    tabVisited: false
  }

  tracks = {
    pageIndex:0,
    finished: false,
    tabVisited: false
  }

  games = {
    pageIndex: 0,
    finished: false,
    tabVisited: false
  }

  books = {
    pageIndex: 0,
    finished: false,
    tabVisited: false
  }

  apps = {
    pageIndex: 0,
    finished: false,
    tabVisited: false
  }

  tabIndex : number = 0;

  popularSeries: SeriesResponseDto = {
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

  popularTracks: TrackResponseDto = {
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

  popularApps: ApplicationResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  searchResults: any = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  searchMode = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public profile: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PopupContentComponent>,
    private seriesService: SeriesService,
    private movieService: MovieService,
    private trackService: TrackService,
    private gameService: GameService,
    private bookService: BookService,
    private profileService: ProfileService,
    private appsService: ApplicationService) { }

  ngOnInit(): void {
    if(!this.tracks.tabVisited) {
      this.trackService.getPopularTracks().then((result: TrackResponseDto) => {
        this.popularTracks = result;
      });
      this.tracks.tabVisited = true;
    }
  }

  startSearch(term: string) {
    this.searchValue = term;
    if(term.length > 0) {
      switch(this.mediaSelected) {
        case 'track': {
          this.searchActivated = true;
          this.searchTracks(term);
          break;
        }
        case 'movie': {
          this.searchActivated = true;
          this.searchMovies(term);
          break;
        }
        case 'series': {
          this.searchActivated = true;
          this.searchSeries(term);
          break;
        }
        case 'game': {
          this.searchActivated = true;
          this.searchGames(term);
          break;
        }
        case 'book': {
          this.searchActivated = true;
          this.searchBooks(term);
          break;
        }
        case 'application': {
          this.searchActivated = true;
          this.searchApps(term);
          break;
        }
      }
    }
  }

  selectValueChange(media: string) {
    this.mediaSelected = media;
  }

  updateIndex(index: number) {
    this.tabIndex = index;
    switch(this.tabIndex) {
      case 0: {
        if(!this.tracks.tabVisited) {
          this.trackService.getPopularTracks().then((result: TrackResponseDto) => {
            this.popularTracks = result;
          });
          this.tracks.tabVisited = true;
        }
        break;
      }
      case 1: {
        if(!this.movies.tabVisited) {
          this.movieService.getPopularMovies().then((result: MovieResponseDto) => {
            this.popularMovies = result;
          });
          this.movies.tabVisited = true;
        }
        break;
      }
      case 2: {
        if(!this.series.tabVisited) {
          this.seriesService.getPopularSeries().then((result: SeriesResponseDto) => {
            this.popularSeries = result;
          });
          this.series.tabVisited = true;
        }
        break;
      }
      case 3: {
        if(!this.games.tabVisited) {
          this.gameService.getPopularGames().then((result: GameResponseDto) => {
            this.popularGames = result;
          });
          this.games.tabVisited = true;
        }
        break;
      }
      case 4: {
        if(!this.books.tabVisited) {
          this.bookService.getPopularBooks().then((result: BookResponseDto) => {
            this.popularBooks = result;
          });
          this.books.tabVisited = true;
        }
        break;
      }
      case 5: {
        if(!this.apps.tabVisited) {
          this.appsService.getPopularApplications().then((result: ApplicationResponseDto) => {
            this.popularApps = result;
          });
          this.apps.tabVisited = true;
        }
        break;
      }
    }
  }

  trackPageChanges(page: PageEvent) {
    if (page.previousPageIndex < page.pageIndex) {
      this.getTracks(page.pageIndex+1);
      this.tracks.pageIndex++;
    } else if (page.previousPageIndex > page.pageIndex) {
      if (page.pageIndex === 0) {
        this.getTracks();
      } else {
        this.getTracks(page.pageIndex+1)
      }
      this.tracks.pageIndex--;
    }
  }

  moviePageChanges(page: PageEvent) {
    if (page.previousPageIndex < page.pageIndex) {
      this.getMovies(page.pageIndex+1);
      this.movies.pageIndex++;
    } else if (page.previousPageIndex > page.pageIndex) {
      if (page.pageIndex === 0) {
        this.getMovies();
      } else {
        this.getMovies(page.pageIndex+1)
      }
      this.movies.pageIndex--;
    }
  }

  seriesPageChanges(page: PageEvent) {
    if (page.previousPageIndex < page.pageIndex) {
      this.getSeries(page.pageIndex+1);
      this.series.pageIndex++;
    } else if (page.previousPageIndex > page.pageIndex) {
      if (page.pageIndex === 0) {
        this.getSeries();
      } else {
        this.getSeries(page.pageIndex+1)
      }
      this.series.pageIndex--;
    }
  }

  gamePageChanges(page: PageEvent) {
    if (page.previousPageIndex < page.pageIndex) {
      this.getGames(page.pageIndex+1);
      this.games.pageIndex++;
    } else if (page.previousPageIndex > page.pageIndex) {
      if (page.pageIndex === 0) {
        this.getGames();
      } else {
        this.getGames(page.pageIndex+1)
      }
      this.games.pageIndex--;
    }
  }

  bookPageChanges(page: PageEvent) {
    if (page.previousPageIndex < page.pageIndex) {
      this.getBooks(page.pageIndex+1);
      this.books.pageIndex++;
    } else if (page.previousPageIndex > page.pageIndex) {
      if (page.pageIndex === 0) {
        this.getBooks();
      } else {
        this.getBooks(page.pageIndex+1)
      }
      this.books.pageIndex--;
    }
  }

  appsPageChanges(page: PageEvent) {
    if (page.previousPageIndex < page.pageIndex) {
      this.getApps(page.pageIndex+1);
      this.apps.pageIndex++;
    } else if (page.previousPageIndex > page.pageIndex) {
      if (page.pageIndex === 0) {
        this.getApps();
      } else {
        this.getApps(page.pageIndex+1)
      }
      this.apps.pageIndex--;
    }
  }

  private getSeries(page: number = 1): void {
    this.seriesService.getSeries(page).then((result: SeriesResponseDto) => {
      this.popularSeries.content = result.content;
    });
  }

  private searchSeries(searchTerm: string): void {
    if (searchTerm.length >= 2) {
      this.seriesService.searchSeries(searchTerm).then((result: SeriesResponseDto) => {
        this.searchResults.content = result.content;
        if (this.searchResults.content.length === 0) {
          this.searchEmpty = true;
        } else {
          this.searchEmpty = false;
        }
      });
    }
  }

  private getMovies(page: number = 1): void {
    this.movieService.getPopularMovies(page).then((result: MovieResponseDto) => {
      this.popularMovies.content = result.content;
    });
  }

  private searchMovies(searchTerm: string): void {
    if (searchTerm.length >= 2) {
      this.movieService.searchMovies(searchTerm).then((result: MovieResponseDto) => {
        this.searchResults.content = result.content;
        if (this.searchResults.content.length === 0) {
          this.searchEmpty = true;
        } else {
          this.searchEmpty = false;
        }
      });
    }
  }

  private getTracks(page: number = 1): void {
    this.trackService.getPopularTracks(page).then((result: TrackResponseDto) => {
      this.popularTracks.content = result.content;
    });
  }

  private searchTracks(searchTerm: string): void {
    if (searchTerm.length >= 2) {
      this.trackService.searchTracks(searchTerm).then((result: TrackResponseDto) => {
        this.searchResults.content = result.content;
        if (this.searchResults.content.length === 0) {
          this.searchEmpty = true;
        } else {
          this.searchEmpty = false;
        }
      });
    }
  }

  private getGames(page: number = 1): void {
    this.gameService.getPopularGames(page).then((result: GameResponseDto) => {
      this.popularGames.content = result.content;
    });
  }

  private searchGames(searchTerm: string): void {
    if (searchTerm.length >= 2) {
      this.gameService.searchGames(searchTerm).then((result: GameResponseDto) => {
        this.searchResults.content = result.content;
        if (this.searchResults.content.length === 0) {
          this.searchEmpty = true;
        } else {
          this.searchEmpty = false;
        }
      });
    }
  }

  private getBooks(page: number = 1): void {
    this.bookService.getPopularBooks(page).then((result: BookResponseDto) => {
      this.popularBooks.content = result.content;
    });
  }

  private searchBooks(searchTerm: string): void {
    if (searchTerm.length >= 2) {
      this.bookService.searchBooks(searchTerm).then((result: BookResponseDto) => {
        this.searchResults.content = result.content;
        if (this.searchResults.content.length === 0) {
          this.searchEmpty = true;
        } else {
          this.searchEmpty = false;
        }
      });
    }
  }

  private getApps(page: number = 1): void {
    this.appsService.getPopularApplications(page).then((result: ApplicationResponseDto) => {
      this.popularApps.content = result.content;
    });
  }

  private searchApps(searchTerm: string): void {
    if (searchTerm.length >= 2) {
      this.appsService.searchApplications(searchTerm).then((result: ApplicationResponseDto) => {
        this.searchResults.content = result.content;
        if (this.searchResults.content.length === 0) {
          this.searchEmpty = true;
        } else {
          this.searchEmpty = false;
        }
      });
    }
  }

  saveOnProfile(item: any): void {
    let payload = {
      rating: 0,
      last_rating_date: new Date(),
      review_see_count: 0,
      last_review_see_date: new Date(),
      count: 0,
      last_count_increment: new Date()
    }

    this.profileService.putNewMetaToProfile(this.profile.uuid, item.content_id, payload).then(() => {
      this.dialogRef.close();
    });
  }

}
