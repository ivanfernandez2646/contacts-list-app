import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthReverseGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.userService.loggedUser$.pipe(
      map(user => {
        if (user) {
          this.router.navigateByUrl('/home');
          return false;
        }
        return true;
      })
    );
  }

}
