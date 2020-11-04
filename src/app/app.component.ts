import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from './services/notification/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _auth: AuthService, private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  get authService(): AuthService {
    return this._auth;
  }


}
