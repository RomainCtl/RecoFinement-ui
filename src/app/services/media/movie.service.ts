import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieMetaResponseDto } from 'src/app/shared/models/DtoResponse/movies/movie-meta.model';
import { MovieResponseDto } from 'src/app/shared/models/DtoResponse/movies/movies.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private urlGetPopularMovies = environment.api_url + '/movie';
  private urlGetGenreMovies = environment.api_url + '/movie/genres';
  private urlUserMeta = environment.api_url + '/movie/';
  private urlSearchMovies = environment.api_url + '/movie/search/';

  constructor(private httpClient: HttpClient) { }

  getPopularMovies(page: number): Promise<MovieResponseDto> {
    return this.httpClient.get<any>(this.urlGetPopularMovies + '?page=' + page).toPromise();
  }

  searchMovies(searchTerm: string): Promise<MovieResponseDto> {
    return this.httpClient.get<MovieResponseDto>(this.urlSearchMovies + searchTerm).toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenreMovies).toPromise();
  }

  saveRating(movieId: number, movieMeta: any): Promise<MovieMetaResponseDto> {
    return this.httpClient.patch<MovieMetaResponseDto>(this.urlUserMeta + movieId + '/meta', movieMeta).toPromise();
  }
}
