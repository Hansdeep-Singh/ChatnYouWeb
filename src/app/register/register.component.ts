import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { LabelAnimation } from "../animations/animations";
import { userModel } from "../models/user";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { NotifyService } from "../services/notify.service";
import { CookieService } from "../services/cookie.service";
import { AuthService } from "../auth/authService";
import { CallsService } from "../services/calls.service";
import { UtilitiesService } from "../services/utilities.service";
import { INotifyConfig } from "../interface/config";


@Component({
  selector: "app-register",
  animations: [LabelAnimation.animeTrigger],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private callsService: CallsService, private router: Router, private cookieService: CookieService,
    private notifyService: NotifyService,
    private utilityService: UtilitiesService,
    private authService: AuthService) { }


  registerForm!: UntypedFormGroup;

  genders = ['Male', 'Female', 'Other'];
  ages = [];
  countries: any[];
  cities: any[];

  getCountries() {
    this.callsService.getNoArg("Location", "GetCountries").subscribe((data) => {
      this.countries = data;
    });

  }

  animateEmail = false;
  animateUserName = false;
  animateAge = false;
  animateCountry = false;
  animateCity = false;
  animatePassword = false;
  animateGender = false;
  message: INotifyConfig | undefined;

  // submit(model: any) {
  //   this.utilityService.Notify(false, 'data?.notify?.message');
  // }


  submit(model: any) {
    //model = JSON.parse('{"emailAddress":"test442@test.com","userName":"test","password":"Hh@4294967296","gender":"Male","age":"33","country":"7","city":"1266"}');
    this.utilityService.Register(model)

      .then(
        (onResolve: any) => {
          this.utilityService.SaveUserAndTokens(JSON.parse(onResolve?.payload));
          this.utilityService.Notify(onResolve?.notify?.success, onResolve?.notify?.message)
          this.utilityService.RegisterUserInfo(model)
            .then((data: any) => {
              this.utilityService.Notify(data?.notify?.success, data?.notify?.message)
            }).then(() => {
              this.router.navigate(['./secure']);
            })
        },
        (onReject: any) => { this.utilityService.Notify(onReject?.notify?.success, onReject?.notify?.message) }
      )





    // .then((onResolve: any) => {
    //   this.utilityService.RegisterUserInfo(model)
    //     .then((data: any) => {
    //       this.utilityService.Notify(data?.notify?.success, data?.notify?.message)
    //     })
    // }
    // )
  }

  validForm() {
    this.registerForm.invalid ? this.utilityService.Notify(false, 'Please complete the form') : "";
  }


  get emailAddress() { return this.registerForm.get('emailAddress'); }
  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }
  get gender() { return this.registerForm.get('gender'); }
  get age() { return this.registerForm.get('age'); }
  get country() { return this.registerForm.get('country'); }
  get city() { return this.registerForm.get('city'); }

  onChange(countryId) {
    this.callsService.get("Location", "GetCities", countryId).subscribe((data) => {
      this.cities = data;
    })
  }

  ngOnInit() {
    this.getCountries();
    for (let i = 18; i < 100; i++) {
      this.ages.push(i);
    }
    this.registerForm = new UntypedFormGroup({
      emailAddress: new UntypedFormControl('', Validators.required),
      userName: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
      gender: new UntypedFormControl('', Validators.required),
      age: new UntypedFormControl('', Validators.required),
      country: new UntypedFormControl('', Validators.required),
      city: new UntypedFormControl('', Validators.required),
    })
  }
}
