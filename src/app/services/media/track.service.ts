import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private urlGetPopularTracks = 'http://127.0.0.1:4040/api/track?page=1';

  constructor(private httpClient: HttpClient) { }

  getPopularTracks(): Promise<any> {
    return this.httpClient.get<any>(this.urlGetPopularTracks).toPromise();
  }
}
