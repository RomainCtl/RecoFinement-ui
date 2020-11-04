import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataDtoResponse } from 'src/app/shared/models/DtoResponse/user-data.model';
import { UserDtoResponse } from 'src/app/shared/models/DtoResponse/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlGetUser = 'http://127.0.0.1:4040/api/user';

  constructor(private httpClient: HttpClient) { }

  getUserData(uuid: string): Promise<UserDtoResponse> {
    return this.httpClient.get<UserDtoResponse>(this.urlGetUser + '/' + uuid).toPromise();
  }

  getUserInfo(search_term: string): Promise<UserDataDtoResponse> {
    return this.httpClient.get<UserDataDtoResponse>(this.urlGetUser + '/search/' + search_term).toPromise();
  }

  updateUser(uuid: string, payload): Promise<UserDtoResponse> {
    return this.httpClient.patch<UserDtoResponse>(this.urlGetUser + '/' + uuid, payload).toPromise();
  }

  deleteUser(uuid: string): Promise<UserDtoResponse> {
    return this.httpClient.delete<UserDtoResponse>(this.urlGetUser + '/' + uuid).toPromise();
  }
}
