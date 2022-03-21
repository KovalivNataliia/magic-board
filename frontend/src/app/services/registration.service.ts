import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  constructor(private http: HttpClient) { }

  regUser(userData: User) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/account/reg';
    return this.http.post(url, userData, {headers: headers}).pipe(map((response: any) => response));
  }
}
