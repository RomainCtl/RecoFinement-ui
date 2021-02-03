import { GameMetaResponseDto } from '../../../models/DtoResponse/games/game-meta.model';
import { GameMeta } from '../../../models/DtoResponse/games/GameMeta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameResponseDto } from 'src/app/models/DtoResponse/games/games.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private urlGetPopularGames = environment.api_url + '/game';
  private urlGetRecommendedGamesForUser = environment.api_url + '/game/user?reco_engine=';
  private urlGetRecommendedGamesFromGroups = environment.api_url + '/game/groups?reco_engine=';
  private urlSearchGames = environment.api_url + '/game/search/';
  private urlGetGenreGames = environment.api_url + '/game/genres';
  private urlUserMeta = environment.api_url + '/game/';

  constructor(private httpClient: HttpClient) { }

  getPopularGames(page: number = 1): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularGames + '?page=' + page).toPromise();
  }

  getRecommendedGamesForUser(engine: string): Promise<GameResponseDto> {
    return this.httpClient.get<GameResponseDto>(this.urlGetRecommendedGamesForUser + engine).toPromise();
  }

  getRecommendedGamesFromGroups(engine: string): Promise<GameResponseDto> {
    return this.httpClient.get<GameResponseDto>(this.urlGetRecommendedGamesFromGroups + engine).toPromise();
  }

  searchGames(searchTerm: string): Promise<GameResponseDto> {
    return this.httpClient.get<GameResponseDto>(this.urlSearchGames + searchTerm + '?page=1').toPromise();
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
