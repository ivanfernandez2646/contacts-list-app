import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiRoute = environment.apiUrl;
  private userHasDoneOperationSource = new ReplaySubject<boolean>(1);
  userHasDoneOperation$ = this.userHasDoneOperationSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getContactsByUserId(userId: string): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.apiRoute}/contacts/${userId}`)
      .pipe(
        map((res: Contact[]) => {
          return res;
        }),
        catchError(e => throwError(e))
      );
  }

  createContact(userId: string, contact: Contact): Observable<Contact> {
    this.userHasDoneOperationSource.next(undefined);
    return this.httpClient.post<Contact>(`${this.apiRoute}/contacts`, { userId, ...contact })
      .pipe(
        map((res: Contact) => {
          this.userHasDoneOperationSource.next(true);
          return res;
        }),
        catchError(e => throwError(e))
      );
  }
}
