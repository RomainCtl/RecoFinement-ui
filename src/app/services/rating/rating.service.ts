import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private httpClient: HttpClient) { }

  private urlPostTrackRate = 'http://127.0.0.1:4040/api/user/track';
  private urlPostMovieRate = 'http://127.0.0.1:4040/api/user/movie';
  private urlPostSerieRate = 'http://127.0.0.1:4040/api/user/serie';
  private urlPostBookRate = 'http://127.0.0.1:4040/api/user/book';
  private urlPostGameRate = 'http://127.0.0.1:4040/api/user/game';
  private urlPostApplicationRate = 'http://127.0.0.1:4040/api/user/application';

  saveRating(rate: number, id: number, type: string): Promise<any> {
    switch (type) {
      case 'music':
        return this.httpClient.post(this.urlPostTrackRate, {track_id: id, rating: rate}).toPromise();
      case 'movie':
        return this.httpClient.post(this.urlPostMovieRate, {track_id: id, rating: rate}).toPromise();
      case 'serie':
        return this.httpClient.post(this.urlPostSerieRate, {track_id: id, rating: rate}).toPromise();
      case 'book':
        return this.httpClient.post(this.urlPostBookRate, {track_id: id, rating: rate}).toPromise();
      case 'game':
        return this.httpClient.post(this.urlPostGameRate, {track_id: id, rating: rate}).toPromise();
      case 'application':
        return this.httpClient.post(this.urlPostApplicationRate, {track_id: id, rating: rate}).toPromise();
    }
  }
}
