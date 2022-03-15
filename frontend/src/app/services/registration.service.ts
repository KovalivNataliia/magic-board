import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(userData: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/account/reg';
    return this.http.post(url, userData, {headers: headers}).pipe(map((response: any) => response));
  }
}
