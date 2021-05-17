import { HttpClient, HttpParams } from '@angular/common/http';
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

  getContactById(id: string): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.apiRoute}/contacts/${id}`)
      .pipe(
        map((res: Contact[]) => {
          return res;
        }),
        catchError(e => throwError(e))
      );
  }

  getContactsByUserId(userId: string): Observable<Contact[]> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.get<Contact[]>(`${this.apiRoute}/contacts`, { params })
      .pipe(
        map((res: Contact[]) => {
          return res;
        }),
        catchError(e => throwError(e))
      );
  }

  createContact(userId: string, contact: Contact): Observable<Contact> {
    this.userHasDoneOperationSource.next(undefined);
    const formData: FormData = new FormData();
    formData.append('userId', userId);
    formData.append('name', contact.name);
    formData.append('lastName', contact.lastName);
    formData.append('telephone', contact.telephone);
    formData.append('img', contact.img);
    return this.httpClient.post<Contact>(`${this.apiRoute}/contacts`, formData)
      .pipe(
        map((res: Contact) => {
          this.userHasDoneOperationSource.next(true);
          return res;
        }),
        catchError(e => throwError(e))
      );
  }

  editContact(id: string, contact: Contact): Observable<Contact> {
    this.userHasDoneOperationSource.next(undefined);
    const formData: FormData = new FormData();
    formData.append('name', contact.name);
    formData.append('lastName', contact.lastName);
    formData.append('telephone', contact.telephone);
    formData.append('img', contact.img);
    return this.httpClient.put<Contact>(`${this.apiRoute}/contacts/${id}`, formData)
      .pipe(
        map((res: Contact) => {
          this.userHasDoneOperationSource.next(true);
          return res;
        }),
        catchError(e => throwError(e))
      );
  }

  deleteContact(id: string): Observable<Contact> {
    this.userHasDoneOperationSource.next(undefined);
    return this.httpClient.delete<Contact>(`${this.apiRoute}/contacts/${id}`)
      .pipe(
        map((res: Contact) => {
          this.userHasDoneOperationSource.next(true);
          return res;
        }),
        catchError(e => throwError(e))
      );
  }
}
