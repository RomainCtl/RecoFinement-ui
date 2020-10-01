import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private cookie: CookieService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + this.cookie.get('access_token')
            }
        });
        return next.handle(authReq);
    }
}
