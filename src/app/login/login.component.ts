import { Component, OnInit } from "@angular/core";
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
  public model = new loginModel("", "", false);
  animateUserName = false;
  animatePassword = false;
  constructor(private service: Service, private _router: Router) {}
  login() {
    this.service.logUserin(this.model).subscribe((data: any) => {
      console.log(data);
      if (data.logged) {
        this._router.navigate(["./secure"]);
        localStorage.setItem("token", data.token);
      }
      if (!data.logged) {
        alert("Not Logged");
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
