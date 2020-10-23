import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private urlGetPopularMovies = 'http://127.0.0.1:4040/api/movie?page=1';
  private urlGetGenreMovies = 'http://127.0.0.1:4040/api/movie/genres';

  constructor(private httpClient: HttpClient) { }

  getPopularMovies(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularMovies).toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenreMovies).toPromise();
  }
}
