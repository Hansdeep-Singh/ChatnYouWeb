import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { Observable } from "rxjs";
import { loginModel } from "../models/login";
import { userModel } from "../models/user";
@Injectable({
  providedIn: "root",
})
export class Service {
  //readonly ROOT_URL = "http://hansdeep-001-site35.htempurl.com/";
  readonly ROOT_URL = "http://localhost:63580/";
  handleError;
  apiPath: string;
  constructor(private http: HttpClient) {}
  logOut() {
    return this.http.get(this.ROOT_URL + "api/User/LogOut/");
  }

  testAuthorise() {
    return this.http.get(this.ROOT_URL + "api/User/Test/");
  }

  logUserin(logmodel: loginModel): Observable<loginModel> {
    return this.http.post<loginModel>(
      this.ROOT_URL + "api/User/Login/",
      logmodel
    );
  }

  getPramStringRetBool(Id: string): Observable<boolean> {
    return this.http
      .get(this.ROOT_URL + this.apiPath + Id)
      .pipe(catchError(this.handleError));
  }

  isloggedin() {
    return !!localStorage.getItem("logged");
  }

  getRetArray(): Observable<any[]> {
    return this.http
      .get(this.ROOT_URL + this.apiPath)
      .pipe(catchError(this.handleError));
  }

  getRetSingle(): Observable<any[]> {
    return this.http
      .get(this.ROOT_URL + this.apiPath)
      .pipe(catchError(this.handleError));
  }

  getPramNumberRetArray(Id: number): Observable<any[]> {
    return this.http
      .get(this.ROOT_URL + this.apiPath + Id)
      .pipe(catchError(this.handleError));
  }

  getPramStringRetArray(Id: string): Observable<any[]> {
    return this.http
      .get(this.ROOT_URL + this.apiPath + Id)
      .pipe(catchError(this.handleError));
  }

  postModel(model: any): Observable<any> {
    return this.http
      .post<any>(this.ROOT_URL + this.apiPath, model)
      .pipe(catchError(this.handleError));
  }
}
