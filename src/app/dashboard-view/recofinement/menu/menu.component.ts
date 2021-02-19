import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from './../../services/socket.service';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/app-view/services/auth.service';
import { UserService } from 'src/app/app-view/services/user/user.service';
import { UserDtoResponse } from 'src/app/models/DtoResponse/user.model';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public username = '';
  showFiller = false;

  constructor(
    private _auth: AuthService,
    private userService: UserService,
    private socketService: SocketService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private bottom: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.username = this.userService.getUsername();
    if(this.socketService.serverResponse.message.split(', ')[0] === '200') {
      this.snackBar.open(this.socketService.serverResponse.message, null, { duration: 3000, horizontalPosition: 'start'});
    }
  }

  logOut(): void {
    this.bottom.dismiss();
    this.dialog.closeAll();
    this._auth.logout();
  }

}
