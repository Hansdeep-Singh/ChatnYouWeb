import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { regModel } from "../models/register";
import { catchError, retry } from "rxjs/operators";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  handleError;
  readonly ROOT_URL = "http://localhost:63580/";

  constructor(private http: HttpClient) {}
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
