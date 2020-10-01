import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackDto } from 'src/app/shared/models/Track.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private urlGetTracks: string = "http://127.0.0.1:4040/api/track/search/test1";

  constructor(private httpClient: HttpClient) { }

  getTracks(): Promise<TrackDto[]> {
    return this.httpClient.get<TrackDto[]>(this.urlGetTracks).toPromise()
  }
}
