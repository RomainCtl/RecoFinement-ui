import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieMetaResponseDto } from 'src/app/models/DtoResponse/movies/movie-meta.model';
import { MovieResponseDto } from 'src/app/models/DtoResponse/movies/movies.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private urlGetPopularMovies = environment.api_url + '/movie';
  private urlGetRecommendedMoviesForUser = environment.api_url + '/movie/user?reco_engine=';
  private urlGetRecommendedMoviesFromGroups = environment.api_url + '/movie/groups?reco_engine=';
  private urlGetGenreMovies = environment.api_url + '/movie/genres';
  private urlUserMeta = environment.api_url + '/movie/';
  private urlAddMovie = environment.api_url + '/movie';
  private urlSearchMovies = environment.api_url + '/movie/search/';
  private urlGetMovieToValidate= environment.api_url + '/movie/additional';
  private urlMovieValidate= environment.api_url + '/movie/additional/'

  constructor(private httpClient: HttpClient) { }

  getPopularMovies(page: number = 1): Promise<MovieResponseDto> {
    return this.httpClient.get<any>(this.urlGetPopularMovies + '?page=' + page).toPromise();
  }

  getRecommendedMoviesForUser(profile: string): Promise<MovieResponseDto> {
    return this.httpClient.get<MovieResponseDto>(this.urlGetRecommendedMoviesForUser + profile).toPromise();
  }

  getRecommendedMoviesFromGroups(profile: string): Promise<MovieResponseDto> {
    return this.httpClient.get<MovieResponseDto>(this.urlGetRecommendedMoviesFromGroups + profile).toPromise();
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

  getUserMeta(movie_id: number): Promise<MovieMetaResponseDto> {
    return this.httpClient.get<MovieMetaResponseDto>(this.urlUserMeta + movie_id + '/meta').toPromise();
  }

  saveWatchedMovie(movie_id: number, movieMeta: any): Promise<MovieMetaResponseDto> {
    return this.httpClient.patch<MovieMetaResponseDto>(this.urlUserMeta + movie_id + '/meta', movieMeta).toPromise();
  }

  postNewMovie(payload: any): Promise<any> {
    return this.httpClient.post<any>(this.urlAddMovie, payload).toPromise();
  }

  getMovieToValidate(): Promise<MovieResponseDto> {
    return this.httpClient.get<MovieResponseDto>(this.urlGetMovieToValidate).toPromise();
  }

  acceptMovieToAdd(movieId: number): Promise<MovieResponseDto> {
    return this.httpClient.put<MovieResponseDto>(this.urlMovieValidate + movieId, null).toPromise();
  }

  refuseMovieToAdd(movieId: number): Promise<MovieResponseDto> {
    return this.httpClient.delete<MovieResponseDto>(this.urlMovieValidate + movieId).toPromise();
  }
}
