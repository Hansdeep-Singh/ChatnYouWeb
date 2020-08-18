import { Component, OnInit } from "@angular/core";
import {
  trigger,
  transition,
  useAnimation,
  state,
  style,
  animate,
} from "@angular/animations";
import { bindNodeCallback } from "rxjs";

@Component({
  selector: "app-home",
  animations: [
    trigger("regDown", [
      state(
        "down",
        style({
          opacity: 1,
          visibility: "visible",
        })
      ),
      state(
        "up",
        style({
          opacity: 0,
        })
      ),
      transition("down => up", [animate("0.5s")]),
      transition("up => down", [animate("0.5s")]),
    ]),
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}
  anime = false;
  ngOnInit() {}

  regBtnFn() {
    this.anime = !this.anime;
  }
}
