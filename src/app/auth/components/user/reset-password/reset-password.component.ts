import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  errorMessage = [];

  constructor(private authService: AuthService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void { }

  resetPassword(formPassword: any): void {
    this.route.params.subscribe(params => {
      this.authService.resetPassword(params.token, formPassword).then(() => {
        this.router.navigate(['login']);
      }).catch((err: HttpErrorResponse) => {
        this.errorMessage = err.error.errors;
      });
    });

  }

}
