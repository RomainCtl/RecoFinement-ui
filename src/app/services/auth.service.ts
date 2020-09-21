import { UserRegisterDtoResponse } from './../shared/models/DtoResponse/user-register.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/DtoRequest/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginDtoResponse } from '../shared/models/DtoResponse/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = 'http://localhost:8081/api/register';
  private _loginUrl = 'http://localhost:8081/api/login';

  isLoggedIn = false;

  redirectUrl: string;

  constructor(private http: HttpClient) {
    if (sessionStorage.length > 0) {
      this.isLoggedIn = (sessionStorage.getItem('isUserLoggedIn') === 'true');
    }
  }

  register(user: User): UserRegisterDtoResponse {
    // return this.http.post(this._registerUrl, user);
    const response: UserRegisterDtoResponse = {
      registered: true,
      error: null
    };
    return response;
  }

  login(): void {
    // return this.http.post(this._loginUrl, user);
    // const response: UserLoginDtoResponse = {
    //   connected: true,
    //   error: null
    // };
    this.isLoggedIn = true;
    sessionStorage.setItem('isUserLoggedIn', 'true');
    // return response;
  }

  get isUserLoggedIn() {
    return this.isLoggedIn;
  }

  logOutUser(): void {
    this.isLoggedIn = false;
  }

}
