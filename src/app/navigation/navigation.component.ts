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

  // https://stackoverflow.com/questions/45350716/detecting-real-time-window-size-changes-in-angular-4


  logOut() {
    this.router.navigate(["/"]);
  }

  ngOnInit() {
    console.log(window.innerWidth);
  }
}

function myFunction(p1, p2) {
  return p1 * p2;
}