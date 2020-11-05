import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataDtoResponse } from 'src/app/shared/models/DtoResponse/user-data.model';
import { UserDtoResponse } from 'src/app/shared/models/DtoResponse/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlGetUser = environment.api_url + '/user';
  private urlGenreUser = environment.api_url + '/user/genre';


  constructor(private httpClient: HttpClient) { }

  getUserData(uuid: string): Promise<UserDtoResponse> {
    return this.httpClient.get<UserDtoResponse>(this.urlGetUser + '/' + uuid).toPromise();
  }

  searchUser(search_term: string): Promise<UserDataDtoResponse> {
    return this.httpClient.get<UserDataDtoResponse>(this.urlGetUser + '/search/' + search_term).toPromise();
  }

  updateUser(uuid: string, payload): Promise<UserDtoResponse> {
    return this.httpClient.patch<UserDtoResponse>(this.urlGetUser + '/' + uuid, payload).toPromise();
  }

  deleteUser(uuid: string): Promise<UserDtoResponse> {
    return this.httpClient.delete<UserDtoResponse>(this.urlGetUser + '/' + uuid).toPromise();
  }

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
