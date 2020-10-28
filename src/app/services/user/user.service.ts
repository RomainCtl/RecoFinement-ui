import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlGenreUser = environment.api_url + '/user/genre';

  constructor(private httpClient: HttpClient) { }

  postGenre(id: number): Promise<any> {
    return this.httpClient.put<any>(this.urlGenreUser + '/' + id, {}).toPromise();
  }

  deleteGenre(id: number): Promise<any> {
    return this.httpClient.delete<any>(this.urlGenreUser + '/' + id).toPromise();
  }

  getGenre(): Promise<any> {
    return this.httpClient.get<any>(this.urlGenreUser).toPromise();
  }
}
