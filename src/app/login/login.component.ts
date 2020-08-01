import { Component, OnInit } from "@angular/core";
import { loginModel } from "../models/login";
import { Router } from "@angular/router";
import { Service } from "../api/service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public model = new loginModel("", "", false);
  constructor(private service: Service, private _router: Router) {}
  login() {
    this.service.logUserin(this.model).subscribe((data: loginModel) => {
      console.log(data);
      if (data) {
        this._router.navigate(["./secure"]);
        localStorage.setItem("logged", "true");
      }
    });
  }
  ngOnInit(): void {}
}
