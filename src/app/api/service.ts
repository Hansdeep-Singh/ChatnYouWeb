import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { Observable } from "rxjs";
import { loginModel } from "../models/login";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: "root",
})
export class Service {
  readonly ROOT_URL = "http://localhost:63580/";
  handleError;
  constructor(private http: HttpClient) {}
  logOut() {
    return this.http.post(this.ROOT_URL + "api/User/LogOut/", httpOptions);
  }

  logUserin(logmodel: loginModel): Observable<loginModel> {
    return this.http.post<loginModel>(
      this.ROOT_URL + "api/User/Login/",
      logmodel,
      httpOptions
    );
  }
  isloggedin() {
    return !!localStorage.getItem("logged");
  }
}
