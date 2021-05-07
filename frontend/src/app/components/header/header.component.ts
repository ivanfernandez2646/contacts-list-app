import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser: User;
  isLoginPage: boolean;

  constructor(public userService: UserService, private router: Router, private location: Location) {
  }

  ngOnInit(): void {
    this.userService.loggedUser$.subscribe(user => this.loggedUser = user);
    this.isLoginPage = this.location.path() === '/login' || this.location.path() === '';
  }

  logout(): void {
    this.userService.logout();
    this.isLoginPage = true;
    this.router.navigateByUrl('/');
  }

  goRegisterPage(): void {
    this.isLoginPage = false;
    this.router.navigateByUrl('/register');
  }

  goLoginPage(): void {
    this.isLoginPage = true;
    this.router.navigateByUrl('/login');
  }
}
