import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private urlGetPopularMovies = environment.api_url + '/movie?page=1';
  private urlGetGenreMovies = environment.api_url + '/movie/genres';

  constructor(private httpClient: HttpClient) { }

  getPopularMovies(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularMovies).toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenreMovies).toPromise();
  }
}
