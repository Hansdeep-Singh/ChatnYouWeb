import { Component, OnInit } from "@angular/core";
import { userModel } from "../models/user";
import { Service } from "../api/service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { labelAnimation } from "../animations/animations";
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
  animations: [labelAnimation.animeTrigger],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private service: Service, private _router: Router) {}
  public model = new userModel("", "", "", "", 0, 0, 0);
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
    this.service.apiPath = "api/User/Register/";
    this.service.postModel(this.model).subscribe((data: any) => {
      if (data.result) {
        this._router.navigate(["./secure"]);
        localStorage.setItem("token", data.token);
      }
    });
  }
  Countries() {
    this.service.apiPath = "api/Location/Countries/";
    return this.service
      .getRetArray()
      .subscribe((countries) => (this.countries = countries));
  }
  selected() {
    this.service.apiPath = "api/Location/Cities/";
    return this.service
      .getPramNumberRetArray(this.model.countryId)
      .subscribe((cities) => (this.cities = cities));
  }
  isEmailRegistered() {
    this.service.apiPath = "api/User/IsEmailRegistered/";
    this.service
      .getPramStringRetBool(this.model.emailAddress)
      .subscribe((data: boolean) => {
        this.isEmailExist = data;
      });
  }

  isUsernameRegistered() {
    this.service.apiPath = "api/User/IsUsernameRegistered/";
    this.service
      .getPramStringRetBool(this.model.userName)
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
