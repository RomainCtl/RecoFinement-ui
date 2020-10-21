import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmationPreferences(): void {
    this.onNoClick();
    this.authService.setPreferences(true);
    this.router.navigate(['app']);
  }

}
