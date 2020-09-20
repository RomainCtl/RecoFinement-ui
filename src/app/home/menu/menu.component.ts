import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this._auth.logOutUser();
    this._router.navigate(['/login']);
  }
}
