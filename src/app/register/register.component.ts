import { Component, OnInit } from "@angular/core";


import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { LabelAnimation } from "../animations/animations";
import { userModel } from "../models/user";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NotifyService } from "../services/notify.service";
import { CookieService } from "../services/cookie.service";
import { AuthService } from "../auth/authService";
import { CallsService } from "../services/calls.service";

@Component({
  selector: "app-register",
  animations: [LabelAnimation.animeTrigger],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private callsService: CallsService, private router: Router, private cookieService: CookieService,
    private engineService: NotifyService,

    private authService: AuthService) { }


  registerForm!: FormGroup;

  genders = ['Male', 'Female', 'Other'];
  ages = [];
  countries = ["India", "France"];
  cities = ["India", "France"];


  animateEmail = false;
  animateUserName = false;
  animateAge = false;
  animateCountry = false;
  animateCity = false;
  animatePassword = false;
  animateGender = false;

  submit(model: any) {
    let mod = '{ "emailAddress": "hansdeep.singh7@hotmail.com", "userName": "hans", "password": "Hh@4294967296", "gender": "Female", "age": "36", "country": "India", "city": "France" }';
    // console.log(JSON.parse(mod));
    let obj = JSON.parse(mod);
    this.callsService.post("User", "Register", obj).subscribe((data) => {
      if (data.success) {
        const payload = JSON.parse(data?.payload);
        this.cookieService.setCookieStringify("user", payload?.User, 1);
        this.cookieService.setCookie("refreshToken", payload?.Tokens?.RefreshToken, 1)
        this.authService.accessToken = payload?.Tokens?.AccessToken;

        // this.router.navigate(['./secure']);

        Promise.resolve()
          .then(() => {
            this.callsService.post("UserInfo", "Register", obj).subscribe((data) => {
              console.log(data);
            })
          });
      }
    });
  }

  validForm() {
    this.registerForm.invalid ? alert("invalid") : "";
  }

  get emailAddress() { return this.registerForm.get('emailAddress'); }
  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }
  get gender() { return this.registerForm.get('gender'); }
  get age() { return this.registerForm.get('age'); }
  get country() { return this.registerForm.get('country'); }
  get city() { return this.registerForm.get('city'); }

  ngOnInit() {
    for (let i = 18; i < 100; i++) {
      this.ages.push(i);
    }
    this.registerForm = new FormGroup({
      emailAddress: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    })
  }
}
