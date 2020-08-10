import { Component, OnInit } from "@angular/core";
import { regModel } from "../models/register";
import { Service } from "../api/service";
import { MatSliderModule } from "@angular/material/slider";
import { Observable } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private service: Service) {}
  public model = new regModel("", "", "", "", 0, "", 0, "", 0);
  countries: any[];
  cities: any[];

  regUser() {
    this.service.registerUser(this.model).subscribe((data: regModel) => {
      console.log(data);
    });
  }
  Countries() {
    return this.service
      .getCountries()
      .subscribe((countries) => (this.countries = countries));
  }
  selected() {
    return this.service
      .getCities(parseInt(this.model.country))
      .subscribe((cities) => (this.cities = cities));
  }
  ngOnInit() {
    this.Countries();
  }
}
