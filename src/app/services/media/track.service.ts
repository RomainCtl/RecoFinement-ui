import { TrackResponseDto } from './../../shared/models/DtoResponse/track.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private urlGetTracks = 'http://127.0.0.1:4040/api/track?page=';
  private urlGetPopularTracks = 'http://127.0.0.1:4040/api/track?page=1';


  constructor(private httpClient: HttpClient) { }

  getTracks(page: number): Promise<TrackResponseDto> {
    return this.httpClient.get<TrackResponseDto>(this.urlGetTracks + page).toPromise();
  }

  getPopularTracks(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularTracks).toPromise();
  }
}
