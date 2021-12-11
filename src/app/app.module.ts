import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component, OnInit, Directive } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";
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

// @Directive()
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SecureComponent,
    HomeComponent,
    NavigationComponent,
    NotifyComponent,
    BaseComponent,
    LoginReactiveComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
    { path: "", component: HomeComponent, pathMatch: "full" },
    { path: "secure", component: SecureComponent },
    { path: "login", component: LoginComponent },
], { relativeLinkResolution: 'legacy' }),
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
