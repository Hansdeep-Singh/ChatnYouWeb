import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LabelAnimation } from '../animations/animations';
import { AuthService } from '../auth/authService';
import { INotifyConfig } from '../interface/config';
import { CallsService } from '../services/calls.service';

import { CookieService } from '../services/cookie.service';
import { NotifyService } from '../services/notify.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login-reactive',
  templateUrl: './login-reactive.component.html',
  animations: [LabelAnimation.animeTrigger],
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  message: INotifyConfig | undefined;
  constructor(private router: Router, private callsService: CallsService,
    private cookieService: CookieService,
    private notifyService: NotifyService,
    private sessionService: SessionService,
    private authService: AuthService,
    private route: ActivatedRoute) { }
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl(''),
    rememberMe: new FormControl(false)
  });
  animateUserName = false;
  animatePassword = false;
  isLogged = false;

  submit(post: any) {
    this.callsService.post("User", "Login", post)
      .subscribe((data) => {
        console.log(data);
        const notify = data.notify;
        if (data?.success) {
          const payload = JSON.parse(data?.payload);
          this.cookieService.setCookieStringify("user", payload?.User, 1);
          this.cookieService.setCookie("refreshToken", payload?.Tokens?.RefreshToken, 1)
          this.authService.accessToken = payload?.Tokens?.AccessToken;

          if (payload?.User?.Roles == 'Admin') this.router.navigate(['./admin']);
          else this.router.navigate(['./secure']);

          this.message = { success: true, notifyMessage: notify.message };
          this.notifyService.changeNotifyMessage(this.message);
          // this.close.emit(false); This is used to close the notification.
        }
        else {
          this.message = { success: notify.success, notifyMessage: notify.message };
          this.notifyService.changeNotifyMessage(this.message);
        }
      });
  }

  animateUserNameFn() {
    this.animateUserName = true;
  }


  animatePasswordFn() {
    this.animatePassword = true;
  }
  ngOnInit(): void {
  }

}
