import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private cookie: CookieService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.cookie.get('access_token')
            }
        });

        return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do something on response
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                this.cookie.delete('access_token', '/');
                this.router.navigate(['/login']);
            }
          })
        );
    }
}
