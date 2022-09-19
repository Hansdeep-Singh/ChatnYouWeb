import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { loginModel } from "../models/login";
import { Router } from "@angular/router";
import { CallsService } from "../services/CallsService";

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
  public model = new loginModel("", "", false);
  //model:loginModel;
  //model:any;
  animateUserName = false;
  animatePassword = false;
  isLogged = false;

  constructor(private callsService: CallsService, private router: Router) {
    super()
  }

  login() {

  }

  message: string = "Test";
  animateUserNameFn() {
    this.animateUserName = true;
  }


  animatePasswordFn() {
    this.animatePassword = true;
  }
  ngOnInit(): void {

  }
}
