import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Service } from "./api/service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private _loginService: Service, private _router: Router) {}

  canActivate(): boolean {
    if (this._loginService.isloggedin()) {
      this._router.navigate(["./secure"]);
      return true;
    } else {
      this._router.navigate([""]);
      return false;
    }
  }
}
