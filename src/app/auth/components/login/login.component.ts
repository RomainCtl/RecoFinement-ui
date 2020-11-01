import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { UserLoginDtoResponse } from './../../../shared/models/DtoResponse/user-login.model';
import { UserLoginDtoRequest } from '../../../shared/models/DtoRequest/user-login.model';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginHttpResponse: UserLoginDtoResponse = {
    status: true,
    message: '',
    user: {
        username: '',
        uuid: '',
        email: ''
    },
    access_token: '',
    errors: ['']
  };
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private cookie: CookieService,
    private errorService: ErrorService) {  }

  ngOnInit(): void { }

  login(values: UserLoginDtoRequest): void {
    this._auth.login(values)
    .then(
      (result: UserLoginDtoResponse) => {
        this.loginHttpResponse = result;
        this.cookie.set('access_token', this.loginHttpResponse.access_token, {expires: 1, sameSite: 'Lax', path: '/'});
        // document.cookie = 'access_token=' + this.loginHttpResponse.access_token + '; path:/';
        this._router.navigate(['app']);
      }
    ).catch((result: HttpErrorResponse) => {
      this.loginHttpResponse = result.error;
      if (this.loginHttpResponse.errors) {
        for (const err of this.loginHttpResponse.errors) {
          this.errorService.addError(err);
        }
      } else {
        this.errorService.addError(this.loginHttpResponse.message);
      }
    });
  }

}
