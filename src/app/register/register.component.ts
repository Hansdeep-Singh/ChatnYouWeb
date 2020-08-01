import { Component, OnInit } from "@angular/core";
import { regModel } from "../models/register";
import { RegisterService } from "../register/register.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private service: RegisterService) {}
  public model = new regModel("", "", "", "", 0, "", "");

  regUser() {
    this.service.registerUser(this.model).subscribe((data: regModel) => {
      console.log(data);
    });
  }
  ngOnInit() {}
}
