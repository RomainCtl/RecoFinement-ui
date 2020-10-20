import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlGenreUser = 'http://127.0.0.1:4040/api/user/genre';

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
