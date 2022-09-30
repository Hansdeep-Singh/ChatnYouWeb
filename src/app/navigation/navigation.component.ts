import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AuthService } from "../auth/authService";


@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html"
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }

  get logged() {

    return this.authService?.isloggedin;
  }
  logOut() {
    this.router.navigate(["/"]);
  }

  ngOnInit() { }
}
