import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiRoute = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  login(): Observable<string> {
    return this.httpClient.get<string>(`${this.apiRoute}/`, { responseType: 'text' as 'json' })
      .pipe(catchError(e => throwError(e)));
  }
}
