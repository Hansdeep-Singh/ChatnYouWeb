import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  setSession(key: string, value: any) {
    if (typeof value === 'object') {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  getSession(key: string): any | null {
    let value = sessionStorage?.getItem(key)!;
    return JSON.parse(value);
  }
  delSessionKey(key: string) {
    sessionStorage.removeItem(key);
  }

  clearSession() {
    sessionStorage.clear();
  }

}
