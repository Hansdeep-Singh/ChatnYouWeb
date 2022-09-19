import { getHtmlTagDefinition } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RouteConfigLoadEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isloading$ = this.isLoading$$.asObservable();
  setLoading(isLoading: boolean) {
    this.isLoading$$.next(isLoading);
  }
}
