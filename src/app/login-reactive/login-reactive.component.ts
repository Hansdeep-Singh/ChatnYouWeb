import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LabelAnimation } from '../animations/animations';

@Component({
  selector: 'app-login-reactive',
  templateUrl: './login-reactive.component.html',
  animations: [LabelAnimation.animeTrigger],
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  constructor(private _router: Router) { }
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl(''),
    rememberMe: new FormControl('')
  });
  animateUserName = false;
  animatePassword = false;
  isLogged = false;

  loginSubmit() {

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
