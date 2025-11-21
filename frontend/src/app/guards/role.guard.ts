import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.userService.getUser();
    const allowedRoles = route.data['roles'] as string[];

    if (!user) {
      this.router.navigate(['/']);

      return false;
    }

    if (!allowedRoles.includes(user.role)) {
      alert("Acesso negado");

      this.router.navigate(['/menu']);

      return false;
    }

    return true;
  }
}