import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { Observable } from "rxjs";
import { loginModel } from "../models/login";
import { regModel } from "../models/register";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: "root",
})
export class Service {
  //readonly ROOT_URL = "http://hansdeep-001-site35.htempurl.com/";
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

  isEmailRegistered(email: string): Observable<boolean> {
    return this.http
      .get(this.ROOT_URL + "api/User/IsEmailRegistered/" + email, httpOptions)
      .pipe(catchError(this.handleError));
  }

  isUsernameRegistered(username: string): Observable<boolean> {
    return this.http
      .get(
        this.ROOT_URL + "api/User/IsUsernameRegistered/" + username,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  isloggedin() {
    return !!localStorage.getItem("logged");
  }

  getCountries(): Observable<any[]> {
    return this.http
      .get(this.ROOT_URL + "api/Location/Countries", httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCities(countryId: number): Observable<any[]> {
    return this.http
      .get(this.ROOT_URL + "api/Location/Cities/" + countryId, httpOptions)
      .pipe(catchError(this.handleError));
  }

  registerUser(remodel: regModel): Observable<regModel> {
    return this.http
      .post<regModel>(
        this.ROOT_URL + "api/User/Register/",
        remodel,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }
}
