import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { loginModel } from "../models/login";
import { Router } from "@angular/router";
import { Service } from "../api/service";
import {
  trigger,
  transition,
  useAnimation,
  state,
  style,
  animate,
} from "@angular/animations";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
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
export class LoginComponent implements OnInit {
  @Output() isLoggedEmitter = new EventEmitter();
  public model = new loginModel("", "", false);
  animateUserName = false;
  animatePassword = false;
  isLogged = false;

  constructor(private service: Service, private _router: Router) {}
  login() {
    this.service.logUserin(this.model).subscribe((data: any) => {
      console.log(data);
      if (data.logged) {
        this._router.navigate(["./secure"]);
        this.isLogged = true;
        localStorage.setItem("token", data.token);
        this.isLoggedEmitter.emit(this.isLogged);
      }
      if (!data.logged) {
        this.isLogged = false;
        this.isLoggedEmitter.emit(this.isLogged);
      }
    });
  }
  animateUserNameFn() {
    this.animateUserName = true;
  }

  animatePasswordFn() {
    this.animatePassword = true;
  }
  ngOnInit(): void {}
}
