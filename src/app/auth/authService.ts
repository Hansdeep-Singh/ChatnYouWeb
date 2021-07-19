import { Component, Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnInit {
  static getToken() {
    return localStorage.getItem("token");
  }
  ngOnInit() {}
}
