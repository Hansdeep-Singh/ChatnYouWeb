import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { loginModel } from "../models/login";
import { Router } from "@angular/router";
import { ApiService } from "../services/ApiService";
import { generalService } from "../services/generalService";
import {
  trigger,
  transition,
  useAnimation,
  state,
  style,
  animate,
} from "@angular/animations";
import { BaseComponent } from "../base/base.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  animations: [
    trigger("labelAnimate", [
      state(
        "over",
        style({
          top: "-4px",
          right: "12px",
          opacity: 0.5,
        })
      ),
      state(
        "left",
        style({
          opacity: 1,
        })
      ),

      transition("left => over", [animate("0.5s")]),
    ]),
  ],
})
export class LoginComponent extends BaseComponent implements OnInit {
  @Output() isLoggedEmitter = new EventEmitter();
  public model = new loginModel("","",false);
  //model:loginModel;
  //model:any;
  animateUserName = false;
  animatePassword = false;
  isLogged = false;

  constructor(private apiService: ApiService, private generalService:generalService, private _router: Router) {
    super ()
  }
  
  login() {
    this.apiService.postMethodWithReturn(this.model,'User','Login').subscribe((data: any) => {
      if (data.logged) {
        this._router.navigate(["./secure"]);
        this.isLogged = true;
        localStorage.setItem("token", data.token);
        this.isLoggedEmitter.emit(this.isLogged);
        this.generalService.messageToNotification="Thanks you, you have successfully logged in";
       
      }
      if (!data.logged) {
        this.isLogged = false;
        this.isLoggedEmitter.emit(this.isLogged);
      }
    });
  }

  message:string = "Test";
  animateUserNameFn() {
    this.animateUserName = true;
  }
  testFn(){this.generalService.messageToNotification="Test from test to notification";}

  animatePasswordFn() {
    this.animatePassword = true;
  }
  ngOnInit(): void {
    this.generalService.messageToNotification="Test msdessage to notification";
  }
}
