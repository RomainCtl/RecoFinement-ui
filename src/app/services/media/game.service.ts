import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private urlGetPopularGames: string = "http://127.0.0.1:4040/api/game?page=1"; 

  constructor(private httpClient: HttpClient) { }

  getPopularGames() {
    return this.httpClient.get<any>(this.urlGetPopularGames).toPromise()
  }
}