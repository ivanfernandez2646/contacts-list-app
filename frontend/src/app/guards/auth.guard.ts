import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(): Observable<boolean> {
    return this.loginService.loggedUser$.pipe(
      map(user => {
        if (user) { return true; }
        this.router.navigateByUrl('/');
        return false;
      })
    );
  }
}
