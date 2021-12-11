import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from "../services/ApiService";
import { LabelAnimation } from '../animations/animations';

@Component({
  selector: 'app-login-reactive',
  templateUrl: './login-reactive.component.html',
  animations: [LabelAnimation.animeTrigger],
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  constructor(private _router:Router, private apiService:ApiService) { }
  loginForm = new FormGroup({
    userName: new FormControl('',Validators.required),
    password: new FormControl(''),
    rememberMe: new FormControl('')
  });
  animateUserName = false;
  animatePassword = false;
  isLogged = false;

  loginSubmit(){
    this.apiService.postMethodWithReturn(this.loginForm.value,'User','Login').subscribe((data: any) => {
      if (data.logged) {
        this._router.navigate(["./secure"]);
        this.isLogged = true;
        localStorage.setItem("token", data.token);
       
       
      }
      if (!data.logged) {
        this.isLogged = false;
        
      }
    });
    //console.warn(this.loginForm.value);
  }
 
  animateUserNameFn() {
    this.animateUserName = true;
  }
  

  animatePasswordFn() {
    this.animatePassword = true;
  }
  ngOnInit(): void {
  }

}
