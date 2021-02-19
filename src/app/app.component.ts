import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './app-view/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from './app-view/services/notification/toast.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _auth: AuthService, private router: Router, private dialog: MatDialog
  ) {
    this.router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ).subscribe(() => {
      this.dialog.closeAll();
    })
   }

  ngOnInit(): void {
  }

  get authService(): AuthService {
    return this._auth;
  }


}
