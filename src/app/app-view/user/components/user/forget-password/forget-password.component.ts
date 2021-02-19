import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/app-view/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private authService: AuthService) { }

  successMessage = '';
  ngOnInit(): void {
  }

  sendResetLink(email): void {
    this.authService.forgetPassword(email).then((result) => {
      this.successMessage = result.message;
    });
  }

}
