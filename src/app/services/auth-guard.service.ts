import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (window.sessionStorage.getItem("token")) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
