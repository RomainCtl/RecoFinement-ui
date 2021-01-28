import { Component, OnInit } from '@angular/core';
import { AuthService } from '../app-view/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  get authService(): AuthService {
    return this._auth;
  }

}
