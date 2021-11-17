import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { SecureComponent } from "./secure/secure.component";

const routes: Routes = [
  {
    path: "secure",
    component: SecureComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
