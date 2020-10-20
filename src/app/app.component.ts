import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _auth: AuthService, private router: Router) { }

  get authService(): AuthService {
    return this._auth;
  }

  

}
