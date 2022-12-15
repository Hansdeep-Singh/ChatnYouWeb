import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { loginModel } from "../models/login";
import { userModel } from "../models/user";
import { environment } from "src/environments/environment";
import { appConsts } from "src/app/constants/const";
@Injectable({
  providedIn: "root",
})
export class CallsService {
  readonly ROOT_URL = environment.ROOT_URL;
  constructor(private http: HttpClient) { }
  get(
    controller: string,
    method: string,
    intId?: number,
    stringId?: string
  ): Observable<any> {
    return this.http
      .get(this.ROOT_URL + `api/${controller}/${method}/${intId ? intId : stringId ? stringId : null}`)
      .pipe(catchError(this.handleError));
  }


  getNoArg(
    controller: string,
    method: string,
  ): Observable<any> {
    return this.http
      .get(this.ROOT_URL + `api/${controller}/${method}`)
      .pipe(catchError(this.handleError));
  }
  post(controller: string, method: string, model?: any): Observable<any> {
    const route = `api/${controller}/${method}/`;
    return this.http
      .post<any>(this.ROOT_URL + route, model)
      .pipe(catchError(this.handleError));
  }

  async getLocal(fileName: string) {
    return fetch('./assets/data/chatUsers.json').then(res => res.json())
      .then((data) => { return data });
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => 'Something bad happened; please try again later.');
  }
}
