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
import { MatSliderModule } from "@angular/material/slider";
import { MatInputModule } from "@angular/material/input";

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
    MatSliderModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "secure", component: SecureComponent },
      { path: "login", component: LoginComponent },
    ]),
  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  ngOnInit() {}
}
