import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRegisterDtoRequest } from '../../../../models/DtoRequest/user-register.model';
import { UserLoginDtoRequest } from '../../../../models/DtoRequest/user-login.model';
import { Router } from '@angular/router';
import { UserRegisterDtoResponse } from '../../../../models/DtoResponse/user-register.model';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/app-view/services/error/error.service';
import { TermsOfUseComponent } from './modal/terms-of-use/terms-of-use.component';
import { ScrollStrategyOptions, Overlay } from '@angular/cdk/overlay';

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
      uuid: '',
      preferences_defined: true,
    },
    access_token: '',
    errors: ['']
  };

  passwordError = '';
  passwordConfirmation = '';

  agreedToConditions = false;


  constructor(
    private _auth: AuthService,
    private _router: Router,
    private cookie: CookieService,
    private errorService: ErrorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public overlay: Overlay) { }

  ngOnInit(): void {
  }

  register(user: UserRegisterDtoRequest): void {

    if (user.password === this.passwordConfirmation) {
      this.passwordError = '';

      if(this.agreedToConditions) {

        
        this._auth.register(user).then(
          (result: UserRegisterDtoResponse) => {
            localStorage.setItem('uuid', result.user.uuid);
            localStorage.setItem('username', result.user.username);
            this.registerHttpResponse = result;
            this.cookie.set('access_token', this.registerHttpResponse.access_token, { expires: 1, sameSite: 'Lax', path: '/' });
            
            // document.cookie = 'access_token=' + this.registerHttpResponse.access_token;
            this._router.navigate(['register/preferences']);
          }
          ).catch(
            (errors: HttpErrorResponse) => {
              this.registerHttpResponse = errors.error;
              if (this.registerHttpResponse.errors) {
                for (const err of this.registerHttpResponse.errors) {
                  this.errorService.addError(err);
                }
              } else {
                this.errorService.addError(this.registerHttpResponse.message);
              }
            }
            );
          } else {
            this.errorService.addError('You must accept the Terms and Conditions of Use to get registered.');
          }
    } else {
      this.passwordError = 'Passwords don\'t match';
      this.errorService.addError(this.passwordError);
    }
  }

  showTermsAndConditions(event: MouseEvent): void {
    event.preventDefault();
    this.dialog.open(TermsOfUseComponent,
      {
        panelClass: ['shadow-none', 'w-75', 'h-75'],
        hasBackdrop: true,
        backdropClass: 'blur'
      });
  }
}
