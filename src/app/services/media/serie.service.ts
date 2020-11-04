import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  private urlGetPopularSerie = environment.api_url + '/serie?page=1';
  private urlGetGenreSerie = environment.api_url + '/serie/genres';

  constructor(private httpClient: HttpClient) { }

  getPopularSeries(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularSerie).toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenreSerie).toPromise();
  }
}
