import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { Service } from "../api/service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {
  constructor(private _navService: Service, private _router: Router) {}

  logged: boolean = false;
  logOut() {
    this._navService.logOut().subscribe();
    localStorage.clear();
    this._router.navigate(["./app"]);
  }
  test() {
    alert(this.logged);
  }
  ngOnInit() {
    if (localStorage.getItem("logged") == "true") {
      this.logged = true;
    }
  }
}
