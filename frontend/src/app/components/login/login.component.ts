import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fetchLogin: Observable<string>;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.fetchLogin = this.loginService.login();
  }

}
