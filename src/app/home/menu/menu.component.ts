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

  constructor(private _auth: AuthService, private _router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.dialog.closeAll();
    this._auth.logout();
  }

}
