import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RecoFinement';

  constructor(private _auth: AuthService, private _router: Router) {
    if (this._auth.isUserLoggedIn()) {
      this._router.navigate(['home']);
    }
  }

  isSession(): boolean {
    return this._auth.isUserLoggedIn();
  }

}
