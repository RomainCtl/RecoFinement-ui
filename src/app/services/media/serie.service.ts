import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SerieMetaResponseDto } from 'src/app/shared/models/DtoResponse/series/serie-meta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  private urlGetPopularSerie = environment.api_url + '/serie?page=1';
  private urlGetGenreSerie = environment.api_url + '/serie/genres';
  private urlUserMeta = environment.api_url + '/serie/';

  constructor(private httpClient: HttpClient) { }

  getPopularSeries(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularSerie).toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenreSerie).toPromise();
  }

  saveRating(serieId: number, serieMeta: any): Promise<SerieMetaResponseDto> {
    return this.httpClient.patch<SerieMetaResponseDto>(this.urlUserMeta + serieId + '/meta', serieMeta).toPromise();
  }
}
