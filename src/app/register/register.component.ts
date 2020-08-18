import { Component, OnInit } from "@angular/core";
import { regModel } from "../models/register";
import { Service } from "../api/service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { transAnimation } from "../animations/animations";
import {
  trigger,
  transition,
  useAnimation,
  state,
  style,
  animate,
} from "@angular/animations";

//top: "-4px", right: "12px", opacity: 0.5
@Component({
  selector: "app-register",
  animations: [
    trigger("labelAnimate", [
      // ...
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

  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private service: Service, private _router: Router) {}
  public model = new regModel("", "", "", "", 0, 0, 0);
  countries: any[];
  cities: any[];
  isUserExist: boolean;
  isEmailExist: boolean;
  animateEmail = false;
  animateUserName = false;
  animateAge = false;
  animateCountry = false;
  animateCity = false;
  animatePassword = false;
  animateGender = false;

  regUser() {
    console.log(this.model);
    this.service.registerUser(this.model).subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        this._router.navigate(["./secure"]);
        localStorage.setItem("token", data.token);
      }
    });
  }
  Countries() {
    return this.service
      .getCountries()
      .subscribe((countries) => (this.countries = countries));
  }
  selected() {
    return this.service
      .getCities(this.model.countryId)
      .subscribe((cities) => (this.cities = cities));
  }
  isEmailRegistered() {
    this.service
      .isEmailRegistered(this.model.emailAddress)
      .subscribe((data: boolean) => {
        this.isEmailExist = data;
      });
  }

  isUsernameRegistered() {
    this.service
      .isUsernameRegistered(this.model.userName)
      .subscribe((data: boolean) => {
        this.isUserExist = data;
      });
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
    this.Countries();
  }
}
