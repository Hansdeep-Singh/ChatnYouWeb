import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";


@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html"
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router) { }

  logged: boolean = false;
  logOut() {
    this.router.navigate(["/"]);
  }






  ngOnInit() { }
}
