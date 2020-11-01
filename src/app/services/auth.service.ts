import { CookieService } from 'ngx-cookie-service';
import { UserRegisterDtoResponse } from './../shared/models/DtoResponse/user-register.model';
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

  private preferenceState: boolean = false;

  private _registerUrl = 'http://localhost:4040/api/auth/register';
  private _loginUrl = 'http://localhost:4040/api/auth/login';
  private _logoutUrl = 'http://localhost:4040/api/auth/logout';
  private urlForgetPassword = 'http://127.0.0.1:4040/api/auth/forget';
  private urlResetPassword = 'http://127.0.0.1:4040/api/auth/reset';

  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService) {  }

  login(user: UserLoginDtoRequest): Promise<UserLoginDtoResponse> {
    return this.http.post<UserLoginDtoResponse>(this._loginUrl, user).toPromise();
  }

  register(user: UserRegisterDtoRequest): Promise<UserRegisterDtoResponse> {
    return this.http.post<UserRegisterDtoResponse>(this._registerUrl, user).toPromise();
  }

  isUserLoggedIn(): boolean {
    return this.cookie.check('access_token');
  }

  isUserPreferencesDefined(): boolean {
    return this.preferenceState;
  }

  setPreferences(state: boolean): void {
    this.preferenceState = state;
  }

  logout(): void {
    this.http.post(this._logoutUrl, null).toPromise().then( () => {
      this.cookie.delete('access_token', '/');
      this.router.navigate(['/']);
    }).catch(error => {
      console.log(error);
    });
  }

  forgetPassword(email: any): Promise<any> {
    return this.http.post<any>(this.urlForgetPassword, email).toPromise();
  }

  resetPassword(token: string, formPassword: any): Promise<any> {
    return this.http.post<any>(this.urlResetPassword, { reset_password_token: token, password: formPassword.newPassword}).toPromise();
  }

}
