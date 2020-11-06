import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    private authService: AuthService,
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmationPreferences(): void {
    this.onNoClick();
    this.userService.setPreferences().then(() => {
      this.authService.setPreferences(true);
    }).catch(err => {
      this.errorService.addError(err.message);
    });
    this.router.navigate(['app']);
  }

}
