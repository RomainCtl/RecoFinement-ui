import { TrackResponseDto } from 'src/app/shared/models/DtoResponse/musics/track-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackMetaResponseDto } from 'src/app/shared/models/DtoResponse/musics/track-meta.model';
import { TrackHistoryResponseDto } from 'src/app/shared/models/DtoResponse/musics/track-history.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private urlGetTracks = environment.api_url + '/track?page=';
  private urlGetPopularTracks = environment.api_url + '/track?page=1';
  private urlGetGenreTracks = environment.api_url + '/track/genres';
  private urlSearchTracks = environment.api_url + '/track/search/';
  private urlUserMeta = environment.api_url + '/track/';
  private urlGetHistoryTracks = environment.api_url + '/track/history?page=';

  constructor(private httpClient: HttpClient) { }

  getTracks(page: number): Promise<TrackResponseDto> {
    return this.httpClient.get<TrackResponseDto>(this.urlGetTracks + page).toPromise();
  }

  getPopularTracks(): Promise<TrackResponseDto> {
    return this.httpClient.get<TrackResponseDto>(this.urlGetPopularTracks).toPromise();
  }

  getHistoryTracks(page: number): Promise<TrackHistoryResponseDto> {
    return this.httpClient.get<TrackHistoryResponseDto>(this.urlGetHistoryTracks + page).toPromise();
  }

  searchTracks(searchTerm: string): Promise<TrackResponseDto> {
    return this.httpClient.get<TrackResponseDto>(this.urlSearchTracks + searchTerm + '?page=1').toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenreTracks).toPromise();
  }

  getUserMeta(trackId: number): Promise<TrackMetaResponseDto> {
    return this.httpClient.get<TrackMetaResponseDto>(this.urlUserMeta + trackId + '/meta').toPromise();
  }

  saveRating(trackId: number, trackMeta: any): Promise<TrackMetaResponseDto> {
    return this.httpClient.patch<TrackMetaResponseDto>(this.urlUserMeta + trackId + '/meta', trackMeta).toPromise();
  }

  savePlayCount(trackId: number, trackMeta: any): Promise<TrackMetaResponseDto> {
    return this.httpClient.patch<TrackMetaResponseDto>(this.urlUserMeta + trackId + '/meta', trackMeta).toPromise();
  }

}
