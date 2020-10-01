import { UserRegisterDtoResponse } from './../shared/models/DtoResponse/user-register.model';
import { CookieService } from 'ngx-cookie-service';
import { UserRegisterDtoRequest } from './../shared/models/DtoRequest/user-register.model';
import { UserLoginDtoRequest } from './../shared/models/DtoRequest/user-login.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDtoResponse } from '../shared/models/DtoResponse/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = 'http://localhost:4040/api/auth/register';
  private _loginUrl = 'http://localhost:4040/api/auth/login';
  private _logoutUrl = 'http://localhost:4040/api/auth/logout';

  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService) { 
   }

  login(user: UserLoginDtoRequest): Promise<UserLoginDtoResponse> {
    return this.http.post<UserLoginDtoResponse>(this._loginUrl, user).toPromise();
  }

  register(user: UserRegisterDtoRequest): Promise<UserRegisterDtoResponse> {
    return this.http.post<UserRegisterDtoResponse>(this._registerUrl, user).toPromise();
  }

  isUserLoggedIn(): boolean {
    return this.cookie.check('access_token');
  }

  logout(): void {
    this.http.post(this._logoutUrl, null).toPromise().then( () => {
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      this.router.navigate(['login']);
      document.location.reload();
    }).catch(error => {
      console.error(error);
    });
  }

}
