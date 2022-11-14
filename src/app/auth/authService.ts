import { Component, Injectable, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CookieService } from '../services/cookie.service';
import { SessionService } from '../services/session.service';
import { CallsService } from '../services/calls.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private _accessToken: string | undefined;
  get accessToken() {
    return this._accessToken;
  }

  set accessToken(value) {
    this._accessToken = value;
  }

  constructor(private callsService: CallsService, private cookieService: CookieService, private sessionService: SessionService) { }
  ngOnInit() { }
  LoginResponse: LoginResponse | undefined;

  getAccessToken() {
    return this.callsService.post("User", "AccessToken", this.LoginConfig).pipe(tap((response: any) => {
      this._accessToken = response.tokens.accessToken;
      if (response.tokens.isRefreshTokenExpired) {
        this.cookieService.setCookie('refreshToken', response.tokens.refreshToken, 1);
      }
    }));
  }

  get LoginConfig(): LoginResponse {
    const user = this.cookieService.getCookieJSON("user");
    const refreshToken = this.cookieService.getCookie("refreshToken");
    return {
      User: { UserId: user.UserId, EmailAddress: user.EmailAddress, Roles: user.Roles },
      Tokens: { RefreshToken: refreshToken }
    }
  }

  get isloggedin(): boolean {
    return (!(this.cookieService.getCookie("refreshToken").length === 0));
  }

  async logout(): Promise<Observable<any>> {
    this.accessToken = undefined;
    this.cookieService.delCookie("refreshToken");
    return of(void 0);
  }
}

interface LoginResponse {
  User: User;
  Tokens: Tokens
}

interface User {
  UserId: string;
  EmailAddress?: string;
  Roles: string;
}
interface Tokens {
  RefreshToken?: string;
}