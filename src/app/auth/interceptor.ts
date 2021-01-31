import { HttpCacheService } from './http-cache.sevice';
import { RedirectConfirmationComponent } from '../shared-features/modals/redirect-confirmation/redirect-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ErrorService } from '../app-view/services/error/error.service';
import { AuthService } from '../app-view/services/auth.service';

declare var $: any;

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
      private cookie: CookieService,
      private router: Router,
      private dialog: MatDialog,
      private auth: AuthService,
      private cacheService: HttpCacheService,
      private error: ErrorService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.cookie.get('access_token')
            }
        });

        if(req.method !== 'GET') {  
          console.log(`Invalidating cache: ${req.method} ${req.url}`);  
          this.cacheService.invalidateCache();  
          return next.handle(req);  
        }  

        const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);  

            // return cached response  
          if (cachedResponse) {  
            console.log(`Returning a cached response: ${cachedResponse.url}`);  
            console.log(cachedResponse);  
            return of(cachedResponse);  
          }

        return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.cacheService.put(req.url, event);  
            }
          }, (err: HttpErrorResponse) => {
            if (err.status === 401) {
              if (this.auth.isUserLoggedIn()) {
                const dialogRef = this.dialog.open(RedirectConfirmationComponent, {
                  disableClose: true
                });
                dialogRef.afterOpened().subscribe(() => {
                    setTimeout(() => {
                        dialogRef.close();
                        this.cookie.delete('access_token', '/');
                        this.router.navigate(['/login']);
                    }, 3000);
                });
                this.error.addError(this.error.msg401error);
              } else {
                this.error.addError(err.error.message);
              }
            } else if (err.status === 400) {
              err.error.errors.forEach(element => {
                this.error.addError(element);
              });
            }
            else if ( err.status === 500 || err.status === 503) {
              this.error.addError(this.error.msg500error);
            }
            else if ( err.status === 504 ) {
              this.error.addError(this.error.msg504error);
            }
            else if ( err.status === 0) {
              this.error.addError('An unknown error has occurred.');
            }
          })
        );
    }
}
