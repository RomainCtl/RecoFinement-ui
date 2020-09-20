import { UserLoginDtoResponse } from './../../../shared/models/DtoResponse/user-login.model';
import { AuthService } from './../../../services/auth.service';
import { User } from '../../../shared/models/DtoRequest/user.model';
import { Component, OnInit } from '@angular/core';
import { sha1 } from '@angular/compiler/src/i18n/digest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(values: User): void {
    // this._auth.login(values).subscribe(
    //   result => {
    //     console.log(result);
    //   }
    // );

    const response: UserLoginDtoResponse = this._auth.loginAttempt(values);

    if (response.connected) {
      //sessionStorage.setItem('User', values);
      // add user to session
    } else {
      // display error on the form
    }
  }

}
