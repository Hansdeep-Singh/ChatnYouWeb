import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component, OnInit, Directive } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SecureComponent } from "./secure/secure.component";
import { RouterModule, CanActivate } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { NotifyComponent } from './notify/notify.component';
import { BaseComponent } from './base/base.component';
import { LoginReactiveComponent } from './login-reactive/login-reactive.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from "./auth/auth.guard";
import { LogoutComponent } from './logout/logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// @Directive()
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SecureComponent,
    HomeComponent,
    NavigationComponent,
    NotifyComponent,
    BaseComponent,
    LoginReactiveComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "secure", component: SecureComponent },
    ], { relativeLinkResolution: 'legacy' }),
    NgbModule,
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
  ngOnInit() { }
}
