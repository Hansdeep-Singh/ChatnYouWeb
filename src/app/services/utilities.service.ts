import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/authService';
import { INotifyConfig } from '../interface/config';
import { CallsService } from './calls.service';
import { CookieService } from './cookie.service';
import { NotifyService } from './notify.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  constructor(private callsService: CallsService,
    private sessionService: SessionService,
    private cookieService: CookieService
    , private routerService: Router,
    private authService: AuthService,
    private notifyService: NotifyService) {
  }

  message: INotifyConfig | undefined;
  Register(model: any) {
    return new Promise((resolve, reject) => {
      this.callsService.post("User", "RegisterAuthUserName", model).subscribe((data) => {
        if (data?.success) {
          resolve(data);
        }
        if (!data?.success) {
          reject(data);
        }
      })
    })
  }



  SaveUserAndTokens(payload) {
    this.cookieService.setCookieStringify("user", payload?.User, 1);
    this.cookieService.setCookie("refreshToken", payload?.Tokens?.RefreshToken, 1);
    this.authService.accessToken = payload?.Tokens?.AccessToken;
  }

  RegisterUserInfo(model) {
    return new Promise(resolve => {
      this.callsService.post("UserInfo", "RegisterInfo", model).subscribe((data) => {
        if (data.success) {
          resolve(data);
        }
      })
    })
  }

  async Notify(success: boolean, message: string) {
    this.message = { success: success, notifyMessage: message };
    this.notifyService.changeNotifyMessage(this.message);
  }

  async Logout() {
    this.callsService.post('User', 'LogOut').subscribe(async (data) => {
      const notify = data?.notify;
      await this.Notify(notify.success, notify.message);
      await this.authService.logout();
      await this.routerService.navigate(['/']);
    }
    )
  }
}
