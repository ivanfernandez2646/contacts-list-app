import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fetchGetUsers: Observable<User[]>;
  fetchGetContacts: Observable<Contact[]>;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.fetchGetUsers = this.loginService.getUsers();
    this.fetchGetContacts = this.loginService.getContacts();
  }

}
