import { Router } from '@angular/router';
import { UserRegisterDtoResponse } from './../../../shared/models/DtoResponse/user-register.model';
import { AuthService } from './../../../services/auth.service';
import { User } from '../../../shared/models/DtoRequest/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(values: User): void {
    // this._auth.registerAttempt(values).subscribe(
    //   result => {
    //     console.log(result);
    //   }
    // );

    const response: UserRegisterDtoResponse = this._auth.registerAttempt(values);

    if (true) {
      // tell user he is registered and ask him his content preferences
      this._router.navigate(['preferences']);
    } else {
      // display errors on the form
    }
  }
}
