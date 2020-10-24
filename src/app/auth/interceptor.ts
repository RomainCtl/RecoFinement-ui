import { RedirectConfirmationComponent } from '../shared/modals/redirect-confirmation/redirect-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private cookie: CookieService, private router: Router, private dialog: MatDialog) { }

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
            }
          })
        );
    }
}
