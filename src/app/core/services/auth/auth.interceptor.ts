import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, mergeMap, Observable, throwError } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getAccessTokenSilently().pipe(
      mergeMap((token: string) => {
        const tokenReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(tokenReq);
      }),
      catchError((err) => {
        if (err.error === 'login_required' || err.status === 401) {
          this.authService.loginWithRedirect();
        }
        return throwError(err);
      })
    );
  }
}
