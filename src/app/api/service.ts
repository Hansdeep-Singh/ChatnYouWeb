import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { Observable } from "rxjs";
import { loginModel } from "../models/login";
import { userModel } from "../models/user";
import { environment } from "src/environments/environment";
import { appConsts } from "src/app/constants/const";
@Injectable({
  providedIn: "root",
})
export class Service {
  readonly ROOT_URL = environment.ROOT_URL;
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

  postMethodWithReturn(
    model: any,
    controller: string,
    method: string
  ): Observable<any> {
    const route = `api/${controller}/${method}/`;
    return this.http.post<any>(this.ROOT_URL + route, model);
  }

  getPramStringRetBool(Id: string): Observable<boolean> {
    return this.http
      .get(this.ROOT_URL + this.apiPath + Id)
      .pipe(catchError(this.handleError));
  }

  isloggedin(): boolean {
    return !!localStorage.getItem("token");
  }

  test() {
    alert();
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
