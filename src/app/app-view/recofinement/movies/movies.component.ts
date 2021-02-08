import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from 'src/app/app-view/services/media/movie.service';
import { CreateMovieDtoRequest } from 'src/app/models/DtoRequest/add-media/create_movie.model';
import { Movie } from 'src/app/models/DtoResponse/movies/Movie.model';
import { MovieResponseDto } from 'src/app/models/DtoResponse/movies/movies.model';
import { AddMediaComponent } from 'src/app/shared-features/modals/popup/add-media/add-media.component';
import { PopupComponent } from 'src/app/shared-features/modals/popup/popup.component';

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

  popularMovies: MovieResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedMoviesForUserFromProfile: MovieResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };


  recommendedMoviesForUserFromSimilarContent: MovieResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedMoviesFromGroupsFromProfile: MovieResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recommendedMoviesFromGroupsFromSimilarContent: MovieResponseDto = {
    status: false,
    message: '',
    content: [],
    number_of_elements: 0,
    page: 0,
    total_pages: 0
  };

  recoChoice: boolean = true;

  ngOnInit(): void {
    this.movieService.getPopularMovies().then((result : MovieResponseDto) => {
      this.popularMovies = result;
    });
    this.movieService.getRecommendedMoviesForUser('FromProfile').then((result: MovieResponseDto) => {
      this.recommendedMoviesForUserFromProfile = result;
    });
    this.movieService.getRecommendedMoviesForUser('FromSimilarContent').then((result: MovieResponseDto) => {
      this.recommendedMoviesForUserFromSimilarContent = result;
    });
    this.movieService.getRecommendedMoviesFromGroups('FromProfile').then((result: MovieResponseDto) => {
      this.recommendedMoviesFromGroupsFromProfile = result;
    })
    this.movieService.getRecommendedMoviesFromGroups('FromSimilarContent').then((result: MovieResponseDto) => {
      this.recommendedMoviesFromGroupsFromSimilarContent = result;
    })
  }

  openPopUp(movie: Movie): void {
    const popupDetails = this.dialog.open<PopupComponent, Movie>(PopupComponent, {
      data: movie,
      panelClass: ['shadow-none', 'w-75', 'h-75'],
      hasBackdrop: true,
      backdropClass: 'blur'
    });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }

  openAddMedia(): void {
    const popupDetails = this.dialog.open < AddMediaComponent,
      CreateMovieDtoRequest > (AddMediaComponent, {
        data: new CreateMovieDtoRequest(),
        panelClass: ['shadow-none', 'w-50'],
        hasBackdrop: true,
        backdropClass: 'blur'
      });

    popupDetails.backdropClick().subscribe(() => {
      popupDetails.close();
    });
  }

}
