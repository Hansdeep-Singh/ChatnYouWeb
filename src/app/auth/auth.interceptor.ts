import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/authService';
import { LoadingService } from '../services/loading.service';

// import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private loadingService: LoadingService, private authService: AuthService) { }
  private totalRequests = 0;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.accessToken) {
      request = this.addToken(request, this.authService.accessToken);
    }
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => { console.log("Error") });
        }
      }),

      finalize(() => {
        this.loadingService.setLoading(false);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8',
    });

    return request.clone({ headers });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.getAccessToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.tokens.accessToken);
          return next.handle(this.addToken(request, token.tokens.accessToken));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
