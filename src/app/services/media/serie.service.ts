import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  private urlGetPopularSerie = 'http://127.0.0.1:4040/api/serie?page=1';

  constructor(private httpClient: HttpClient) { }

  getPopularSeries(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularSerie).toPromise();
  }
}
