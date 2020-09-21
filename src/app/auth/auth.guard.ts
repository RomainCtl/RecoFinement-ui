import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url: string = state.url;

      return this.checkLogin(url);
      // this.router.navigate(['./login']);
      // console.log('You are not authenticated!!!!');
      // return this.auth.isUserLoggedIn();
  }

  checkLogin(url: string): true|UrlTree {
    if (this.auth.isUserLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.auth.redirectUrl = url;

    // redirect to login page
    return this.router.parseUrl('/login');
  }
}
