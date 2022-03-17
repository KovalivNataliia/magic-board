import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  token: any;
  user: any;

  constructor(private http: HttpClient) { }

  authUser(userData: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/account/auth';
    return this.http.post(url, userData, {headers: headers}).pipe(map((response: any) => response));
  }

  storeUser(token: any, user: any) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));

    this.token = token;
    this.user = user;
  }
}
