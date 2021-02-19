import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private httpClient: HttpClient) { }

  private urlPostTrackRate = environment.api_url + '/user/track';
  private urlPostMovieRate = environment.api_url + '/user/movie';
  private urlPostSerieRate = environment.api_url + '/user/serie';
  private urlPostBookRate = environment.api_url + '/user/book';
  private urlPostGameRate = environment.api_url + '/user/game';
  private urlPostApplicationRate = environment.api_url + '/user/application';

  saveRating(rate: number, id: number, type: string): Promise<any> {
    switch (type) {
      case 'music':
        return this.httpClient.post(this.urlPostTrackRate, { track_id: id, rating: rate }).toPromise();
      case 'movie':
        return this.httpClient.post(this.urlPostMovieRate, { track_id: id, rating: rate }).toPromise();
      case 'serie':
        return this.httpClient.post(this.urlPostSerieRate, { track_id: id, rating: rate }).toPromise();
      case 'book':
        return this.httpClient.post(this.urlPostBookRate, { track_id: id, rating: rate }).toPromise();
      case 'game':
        return this.httpClient.post(this.urlPostGameRate, { track_id: id, rating: rate }).toPromise();
      case 'application':
        return this.httpClient.post(this.urlPostApplicationRate, { track_id: id, rating: rate }).toPromise();
    }
  }
}
