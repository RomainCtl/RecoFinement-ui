import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRegisterDtoRequest } from './../../../shared/models/DtoRequest/user-register.model';
import { UserLoginDtoRequest } from './../../../shared/models/DtoRequest/user-login.model';
import { Router } from '@angular/router';
import { UserRegisterDtoResponse } from './../../../shared/models/DtoResponse/user-register.model';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerHttpResponse: UserRegisterDtoResponse = {
    message: '',
    status: true,
    user: {
      email: '',
      username: '',
      uuid: ''
    },
    access_token: '',
    errors: ['']
  };

  passwordError = '';
  passwordConfirmation = '';


  constructor(private _auth: AuthService, private _router: Router, private cookie: CookieService) { }

  ngOnInit(): void {
  }

  register(user: UserRegisterDtoRequest): void {

    if (user.password === this.passwordConfirmation) {
      this.passwordError = '';

      this._auth.register(user).then(
        (result: UserRegisterDtoResponse) => {
          localStorage.setItem('uuid', result.user.uuid);
          localStorage.setItem('username', result.user.username);
          localStorage.setItem('email', result.user.email);
          this.registerHttpResponse = result;
          document.cookie = 'access_token=' + this.registerHttpResponse.access_token;
          this._router.navigate(['register/preferences']);
        }
      ).catch(
        (errors: HttpErrorResponse) => {
          this.registerHttpResponse = errors.error;
        }
      );
    } else {
      this.passwordError = 'Passwords don\'t match';
    }
  }
}
