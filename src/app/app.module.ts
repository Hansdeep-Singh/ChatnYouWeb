import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component, OnInit, Directive } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./-auth.guard";
import { SecureComponent } from "./secure/secure.component";
import { RouterModule, CanActivate } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor } from "./auth/auth.interceptor";

// @Directive()
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SecureComponent,
    HomeComponent,
    NavigationComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "secure", component: SecureComponent },
      { path: "login", component: LoginComponent },
    ]),
  ],

  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  ngOnInit() {}
}
