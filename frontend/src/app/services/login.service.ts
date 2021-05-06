import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiRoute = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>(`${this.apiRoute}/login`, { username, password })
      .pipe(catchError(e => throwError(e)));
  }

  register(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>(`${this.apiRoute}/register`, { username, password })
      .pipe(catchError(e => throwError(e)));
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
