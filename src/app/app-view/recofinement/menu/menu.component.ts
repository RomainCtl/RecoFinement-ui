import { CookieService } from 'ngx-cookie-service';
import { UserDtoResponse } from 'src/app/models/DtoResponse/user.model';
import { UserService } from 'src/app/app-view/services/user/user.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

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
      this.username = this.userService.getUsername();
  }

  logOut(): void {
    this.bottom.dismiss();
    this.dialog.closeAll();
    localStorage.clear();
    this._auth.logout();
  }

}
