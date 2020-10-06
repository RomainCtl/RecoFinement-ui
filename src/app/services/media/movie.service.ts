import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private urlGetPopularMovies: string = "http://127.0.0.1:4040/api/movie?page=1"; 

  constructor(private httpClient: HttpClient) { }

  getPopularMovies() {
    return this.httpClient.get<any>(this.urlGetPopularMovies).toPromise()
  }
}
