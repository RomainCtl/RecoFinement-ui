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

  constructor(private http: HttpClient) { }

  registerAttempt(user: User): UserRegisterDtoResponse {
    // return this.http.post(this._registerUrl, user);
    const response: UserRegisterDtoResponse = {
      registered: true,
      error: null
    };
    return response;
  }

  loginAttempt(user: User): UserLoginDtoResponse {
    // return this.http.post(this._loginUrl, user);
    const response: UserLoginDtoResponse = {
      connected: true,
      error: null
    };
    return response;
  }

  isUserLoggedIn(): boolean {
    return true;
  }

  logOutUser(): void {
    // clear user session
  }

}
