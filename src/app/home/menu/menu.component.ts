import { CookieService } from 'ngx-cookie-service';
import { UserDtoResponse } from 'src/app/shared/models/DtoResponse/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public username = '';
  showFiller = false;

  constructor(
    private _auth: AuthService,
    private userService: UserService,
    private cookie: CookieService,
    private _router: Router,
    private dialog: MatDialog,
    private bottom: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.userService.getUserData(this.cookie.get('user_id')).then((result: UserDtoResponse) => {
      this.username = result.user.username;
    });
  }

  logOut(): void {
    this.bottom.dismiss();
    this.dialog.closeAll();
    this._auth.logout();
  }

}
