import { SeriesResponseDto } from '../../../models/DtoResponse/series/series-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SerieMetaResponseDto } from 'src/app/models/DtoResponse/series/serie-meta.model';
import { environment } from 'src/environments/environment';
import { EpisodeDtoResponse } from 'src/app/models/DtoResponse/series/episode-dto.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private urlGetPopularSerie = environment.api_url + '/serie';
  private urlGetRecommendedSeriesForUser = environment.api_url + '/serie/user?reco_engine=';
  private urlGetRecommendedSeriesFromGroups = environment.api_url + '/serie/groups?reco_engine=';
  private urlGetGenreSerie = environment.api_url + '/serie/genres';
  private urlGetEpisodesSeries = environment.api_url + '/serie/';
  private urlUserMeta = environment.api_url + '/serie/';
  private urlAddSerie = environment.api_url + '/serie';
  private urlSearchSeries = environment.api_url + '/serie/search/';
  private urlGetSeries = environment.api_url + '/serie?page=';

  private urlGetSerieToProfile= environment.api_url + '/profile/';
  private urlGetHistorySerieToProfile= '/history/';



  constructor(private httpClient: HttpClient) { }

  getUserMeta(series_id: number): Promise<SerieMetaResponseDto> {
    return this.httpClient.get<SerieMetaResponseDto>(this.urlUserMeta + series_id + '/meta').toPromise();
  }

  getSeries(page: number = 1): Promise<SeriesResponseDto> {
    return this.httpClient.get<SeriesResponseDto>(this.urlGetSeries + page).toPromise();
  }

  getPopularSeries(): Promise<SeriesResponseDto> {
    return this.httpClient.get<SeriesResponseDto>(this.urlGetPopularSerie).toPromise();
  }

  getRecommendedSeriesForUser(engine: string): Promise<SeriesResponseDto> {
    return this.httpClient.get<SeriesResponseDto>(this.urlGetRecommendedSeriesForUser + engine).toPromise();
  }

  getRecommendedSeriesFromGroups(engine: string): Promise<SeriesResponseDto> {
    return this.httpClient.get<SeriesResponseDto>(this.urlGetRecommendedSeriesFromGroups + engine).toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenreSerie).toPromise();
  }

  getEpisodes(serieId: number): Promise<EpisodeDtoResponse> {
    return this.httpClient.get<EpisodeDtoResponse>(this.urlGetEpisodesSeries + serieId + '/episodes').toPromise();
  }

  searchSeries(searchTerm: string): Promise<SeriesResponseDto> {
    return this.httpClient.get<SeriesResponseDto>(this.urlSearchSeries + searchTerm).toPromise();
  }

  saveRating(serieId: number, serieMeta: any): Promise<SerieMetaResponseDto> {
    return this.httpClient.patch<SerieMetaResponseDto>(this.urlUserMeta + serieId + '/meta', serieMeta).toPromise();
  }

  saveWatchedEpisodes(seriesId: number, seriesMeta: any): Promise<SerieMetaResponseDto> {
    return this.httpClient.patch<SerieMetaResponseDto>(this.urlUserMeta + seriesId + '/meta', seriesMeta).toPromise();
  }

  postNewSerie(payload: any): Promise<any> {
    return this.httpClient.post<any>(this.urlAddSerie, payload).toPromise();
  }

  getSerieToProfile(uuid: string): Promise<any> {
    return this.httpClient.get(this.urlGetSerieToProfile + uuid + '/serie/meta').toPromise();
  }

  getHistorySerieToProfile(uuid: string, history_id: string): Promise<any> {
    return this.httpClient.get(this.urlGetSerieToProfile + uuid + this.urlGetHistorySerieToProfile + history_id + '/serie/result').toPromise();
  }
}
