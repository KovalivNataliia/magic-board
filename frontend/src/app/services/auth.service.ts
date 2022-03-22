import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  authUser(userData: User) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/account/auth';
    return this.http.post(url, userData, { headers: headers }).pipe(map((response: any) => response));
  }

  storeUser(token: string, user: User) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  isLoggedIn() {
    const jwtHelper = new JwtHelperService();
    const token: string | any = sessionStorage.getItem('token');
    return !jwtHelper.isTokenExpired(token);
  }

  logOut() {
    sessionStorage.clear();
  }
}
