import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private urlGetPopularGames = 'http://127.0.0.1:4040/api/game';
  private urlGetGenreGames = 'http://127.0.0.1:4040/api/game/genres';

  constructor(private httpClient: HttpClient) { }

  getPopularGames(page: number): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularGames + '?page=' + page).toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenreGames).toPromise();
  }
}
