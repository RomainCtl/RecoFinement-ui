import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('guard');
    console.log(this._auth.isUserLoggedIn());
    if (!this._auth.isUserLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
