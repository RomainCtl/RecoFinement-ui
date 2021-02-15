import { SocketService } from './../../dashboard-view/services/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { UserRegisterDtoResponse } from '../../models/DtoResponse/user-register.model';
import { UserRegisterDtoRequest } from '../../models/DtoRequest/user-register.model';
import { UserLoginDtoRequest } from '../../models/DtoRequest/user-login.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDtoResponse } from '../../models/DtoResponse/user-login.model';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private preferenceState: boolean = false;

  private _registerUrl = environment.api_url + '/auth/register';
  private _loginUrl = environment.api_url + '/auth/login';
  private _logoutUrl = environment.api_url + '/auth/logout';
  private urlForgetPassword = environment.api_url + '/auth/forget';
  private urlResetPassword = environment.api_url + '/auth/reset';

  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService, private socketService: SocketService) { }

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

  isUserAdmin(): boolean {
    if(document.cookie) {
      let access_token: any = jwt_decode(document.cookie.split('; ').filter(cookie => cookie.startsWith('access_token'))[0].split('=')[1]);
      return access_token.user_claims.permissions.includes('access_sandbox');
    } else {
      return false;
    }
  }

  setPreferences(state: boolean): void {
    this.preferenceState = state;
  }

  logout(): void {
    this.http.post(this._logoutUrl, null).toPromise().then(() => {
      this.cookie.delete('access_token', '/');
      this.socketService.disconnect();
      this.router.navigate(['app/login']);
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
