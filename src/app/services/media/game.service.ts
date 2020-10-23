import { GameMetaResponseDto } from './../../shared/models/DtoResponse/games/game-meta.model';
import { GameMeta } from '../../shared/models/DtoResponse/games/GameMeta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private urlGetPopularGames = 'http://127.0.0.1:4040/api/game';
  private urlGetGenreGames = 'http://127.0.0.1:4040/api/game/genres';
  private urlUserMeta = 'http://127.0.0.1:4040/api/game/';

  constructor(private httpClient: HttpClient) { }

  getPopularGames(page: number): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularGames + '?page=' + page).toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenreGames).toPromise();
  }

  getUserMeta(gameId: number): Promise<GameMetaResponseDto> {
    return this.httpClient.get<GameMetaResponseDto>(this.urlUserMeta + gameId + '/meta').toPromise();
  }

  savePurchasedState(gameId: number, gameMeta: any): Promise<GameMetaResponseDto> {
    return this.httpClient.patch<GameMetaResponseDto>(this.urlUserMeta + gameId + '/meta', gameMeta).toPromise();
  }

  saveRating(gameId: number, gameMeta: any): Promise<GameMetaResponseDto> {
    return this.httpClient.patch<GameMetaResponseDto>(this.urlUserMeta + gameId + '/meta', gameMeta).toPromise();
  }
}
