import { Component, OnInit } from "@angular/core";

import { CallsService } from "../services/CallsService";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { LabelAnimation } from "../animations/animations";
import {
  trigger,
  transition,
  useAnimation,
  state,
  style,
  animate,
} from "@angular/animations";
import { userModel } from "../models/user";

//top: "-4px", right: "12px", opacity: 0.5
@Component({
  selector: "app-register",
  animations: [LabelAnimation.animeTrigger],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private callsService: CallsService, private _router: Router) { }
  public model = new userModel("", "", "", "", 0, 0, 0);


  animateEmail = false;
  animateUserName = false;
  animateAge = false;
  animateCountry = false;
  animateCity = false;
  animatePassword = false;
  animateGender = false;

  regUser() {

  }


  animateEmailFn() {
    this.animateEmail = true;
  }
  animateUserNameFn() {
    this.animateUserName = true;
  }

  animatePasswordFn() {
    this.animatePassword = true;
  }

  animateCountryFn() {
    this.animateCountry = true;
  }

  animateCityFn() {
    this.animateCity = true;
  }
  animateGenderFn() {
    this.animateGender = true;
  }

  animateAgeFn() {
    this.animateAge = true;
  }

  ngOnInit() {

  }
}
