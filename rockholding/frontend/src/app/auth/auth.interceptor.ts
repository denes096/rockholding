import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') != null) {
            const request = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });
            return next.handle(request).pipe(
                tap(
                    succ => {},
                    err => {
                        if (err.status == 401) {
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/login');
                        }
                    }
                )
            );
        } else {
            return next.handle(req.clone());
        }
    }

}