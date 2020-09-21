import { Router } from '@angular/router';
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

  constructor(private _auth: AuthService, private router: Router) {
    console.log(this._auth.isUserLoggedIn)
    if (this._auth.isUserLoggedIn) {
      this.router.navigate(['./app']);
    }
   }

  ngOnInit(): void {
  }

  loginUser(values: User): void {
    // this._auth.login(values).subscribe(
    //   result => {
    //     console.log(result);
    //   }
    // );

    this._auth.login();

    // if (response.connected) {
    //   //sessionStorage.setItem('User', values);
    //   // add user to session
    // } else {
    //   // display error on the form
    // }
  }

}
