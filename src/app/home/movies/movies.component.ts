import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MovieService } from 'src/app/services/media/movie.service';
import { PopupComponent } from 'src/app/shared/modals/popup/popup.component';
import { Movie } from 'src/app/shared/models/DtoResponse/movies/Movie.model';
import { MovieResponseDto } from 'src/app/shared/models/DtoResponse/movies/movies.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    public dialog: MatDialog
  ) { }

  movieResponse: MovieResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  nextPage = 2;
  finished = true;
  noMovies = true;
  apiResponse = false;

  searchEmpty = false;
  searchActivated = false;
  searchInput = '';

  appCtrl = new FormControl();
  filteredMovies: Observable<Movie[]>;

  ngOnInit(): void {
    this.movieService.getPopularMovies(1).then((result: MovieResponseDto) => {
      this.movieResponse = result;
      this.apiResponse = true;

      if (result.number_of_elements !== 0) {
        this.finished = false;
      }

      this.filteredMovies = this.appCtrl.valueChanges.pipe(
        startWith(''),
        map(movie => movie ? this._filter(movie) : this.movies.content.slice())
      );
    });
  }

  private _filter(value: string): Movie[] {
    const filterValue = value.toLowerCase();
    return this.movies.content.filter(movie => movie.title.toLowerCase().indexOf(filterValue) === 0);
  }

  onScroll(): void {
    if (this.nextPage <= this.movieResponse.total_pages) {
      this.getMovies(this.nextPage);
    } else {
      this.finished = true;
    }
  }

  private getSearchedMovies(searchTerm: string): void {
    this.movieService.searchMovies(searchTerm).then((result: MovieResponseDto) => {
      this.movieResponse.content = result.content;
      if (this.movieResponse.content.length === 0) {
        this.searchEmpty = true;
      } else {
        this.searchEmpty = false;
      }
    });
  }

  get movies(): MovieResponseDto {
    return this.movieResponse;
  }

  private getMovies(page?: number): void {
    this.movieService.getPopularMovies(page).then((result: MovieResponseDto) => {
      this.movieResponse.content = this.movieResponse.content.concat(result.content);
      this.nextPage++;
    });
  }

  openPopUp(index: number): void {
    const popupDetails = this.dialog.open<PopupComponent, Movie>(PopupComponent, {
      data: this.movieResponse.content[index],
      panelClass: ['shadow-none'],
      hasBackdrop: true,
      backdropClass: 'blur'
    });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }

  searchMovies(searchTerm: string): void {
    if (searchTerm.length >= 2) {
      this.searchActivated = true;
      this.getSearchedMovies(searchTerm);
    }

    if (searchTerm.length === 0) {
      this.movieService.getPopularMovies(1).then((result: MovieResponseDto) => {
        this.movieResponse = result;
        this.searchActivated = false;
        if (result.number_of_elements !== 0) {
          this.noMovies = false;
        }
        if (this.nextPage !== this.movieResponse.total_pages) {
          this.finished = false;
        }
      });
    }
  }

}
