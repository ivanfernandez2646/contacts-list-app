import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiRoute = environment.apiUrl;
  private loggedUserSource = new ReplaySubject<User>(1);
  loggedUser$ = this.loggedUserSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>(`${this.apiRoute}/login`, { username, password })
      .pipe(
        map((res: User) => {
          this.setUserLogged(res);
          return res;
        }),
        catchError(e => throwError(e)));
  }

  register(username: string, password: string): Observable<User> {
    console.log(username);

    return this.httpClient.post<User>(`${this.apiRoute}/register`, { username, password })
      .pipe(
        map((res: User) => {
          this.setUserLogged(res);
          return res;
        }),
        catchError(e => throwError(e)));
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.loggedUserSource.next(null);
  }

  setUserLogged(user?: User): void {
    if (user) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      this.loggedUserSource.next(user);
    } else {
      this.loggedUserSource.next(JSON.parse(localStorage.getItem('loggedUser')));
    }
  }

  // // Fake get users
  // getUsers(): Observable<User[]> {
  //   return this.httpClient.get<User[]>(`${this.apiRoute}/users`)
  //     .pipe(catchError(e => throwError(e)));
  // }

  // // Fake get contacts
  // getContacts(): Observable<Contact[]> {
  //   return this.httpClient.get<Contact[]>(`${this.apiRoute}/contacts`)
  //     .pipe(catchError(e => throwError(e)));
  // }
}
