import { TrackResponseDto } from '../../shared/models/DtoResponse/musics/track-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private urlGetTracks = 'http://127.0.0.1:4040/api/track?page=';
  private urlGetPopularTracks = 'http://127.0.0.1:4040/api/track?page=1';
  private urlGetGenreTracks = 'http://127.0.0.1:4040/api/track/genres';


  constructor(private httpClient: HttpClient) { }

  getTracks(page: number): Promise<TrackResponseDto> {
    return this.httpClient.get<TrackResponseDto>(this.urlGetTracks + page).toPromise();
  }

  getPopularTracks(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularTracks).toPromise();
  }

  getGenres(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetGenreTracks).toPromise();
  }
}
