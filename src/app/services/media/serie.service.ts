import { SeriesResponseDto } from './../../shared/models/DtoResponse/series/series-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SerieMetaResponseDto } from 'src/app/shared/models/DtoResponse/series/serie-meta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private urlGetPopularSerie = environment.api_url + '/serie';
  private urlGetGenreSerie = environment.api_url + '/serie/genres';
  private urlUserMeta = environment.api_url + '/serie/';
  private urlSearchSeries = environment.api_url + '/serie/search/';
  private urlGetSeries = environment.api_url + '/serie?page=';


  constructor(private httpClient: HttpClient) { }

  getSeries(page: number): Promise<SeriesResponseDto> {
    return this.httpClient.get<SeriesResponseDto>(this.urlGetSeries + page).toPromise();
  }

  getPopularSeries(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularSerie).toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenreSerie).toPromise();
  }

  searchSeries(searchTerm: string): Promise<SeriesResponseDto> {
    return this.httpClient.get<SeriesResponseDto>(this.urlSearchSeries + searchTerm).toPromise();
  }

  saveRating(serieId: number, serieMeta: any): Promise<SerieMetaResponseDto> {
    return this.httpClient.patch<SerieMetaResponseDto>(this.urlUserMeta + serieId + '/meta', serieMeta).toPromise();
  }
}
