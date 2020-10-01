import { CookieService } from 'ngx-cookie-service';
import { UserLoginDtoResponse } from './../../../shared/models/DtoResponse/user-login.model';
import { UserLoginDtoRequest } from '../../../shared/models/DtoRequest/user-login.model';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

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
  constructor(private _auth: AuthService, private router: Router) {  }

  ngOnInit(): void {
  }

  login(values: UserLoginDtoRequest): void {
    this._auth.login(values)
    .then(
      (result: UserLoginDtoResponse) => {
        this.loginHttpResponse = result;
        document.cookie = 'access_token=' + this.loginHttpResponse.access_token;
        this.router.navigate(['app']);
      }
    ).catch((result: HttpErrorResponse) => {
      this.loginHttpResponse = result.error;
    });
  }

}
