import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { ApiService } from "../services/ApiService";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html"
})
export class NavigationComponent implements OnInit {
  constructor(private _navService: ApiService, private _router: Router) {}

  logged: boolean = false;
  logOut() {
    this._navService.logOut().subscribe();
    localStorage.clear();
    this.logged = false;
    this._router.navigate(["/"]);
  }
  test() {
    alert(localStorage.getItem("token"));
  }

  testAuthorise() {
    this._navService.testAuthorise().subscribe();
  }

  showLogin(isLogged: boolean) {
    this.logged = isLogged;
  }

  ngOnInit() {}
}
