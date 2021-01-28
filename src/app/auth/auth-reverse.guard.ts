import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../app-view/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthReverseGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this._auth.isUserLoggedIn()) {
        this._router.navigate(['app']);
        return false;
      }
      return true;
    }
  }
