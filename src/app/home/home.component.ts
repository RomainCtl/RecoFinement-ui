import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) {
    if (!this._auth.isUserLoggedIn()) {
      this._router.navigate(['login']);
    }
   }

  ngOnInit(): void {
  }

}
