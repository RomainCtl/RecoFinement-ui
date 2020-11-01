import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private authService: AuthService) { }

  emailSent = false;
  errorMessage = [];
  successMessage = '';
  ngOnInit(): void {
  }

  sendResetLink(email): void {
    this.authService.forgetPassword(email).then((result) => {
      this.emailSent = true;
      this.successMessage = result.message;

    }).catch((err: HttpErrorResponse) => {
      this.errorMessage = err.error.errors;
    });
  }

}
