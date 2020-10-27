import { TrackResponseDto } from '../../shared/models/DtoResponse/musics/track-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackMetaResponseDto } from 'src/app/shared/models/DtoResponse/musics/track-meta.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private urlGetTracks = 'http://127.0.0.1:4040/api/track?page=';
  private urlGetPopularTracks = 'http://127.0.0.1:4040/api/track?page=1';
  private urlGetGenreTracks = 'http://127.0.0.1:4040/api/track/genres';
  private urlSearchTracks = 'http://127.0.0.1:4040/api/track/search/';
  private urlUserMeta = 'http://127.0.0.1:4040/api/track/';


  constructor(private httpClient: HttpClient) { }

  getTracks(page: number): Promise<TrackResponseDto> {
    return this.httpClient.get<TrackResponseDto>(this.urlGetTracks + page).toPromise();
  }

  getPopularTracks(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularTracks).toPromise();
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
