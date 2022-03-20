import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class BoardService {

  url: string = 'http://localhost:3000/board/list';
  lists!: any;
  lists$: any;

  constructor(private http: HttpClient) { }

  getLists$() {
    return this.lists$;
  }

  getListsData(userId: string) {
    const params = new HttpParams().set('userId', userId);
    return this.http.get(this.url, { params: params }).pipe(map((response: any) => response));
  }

  addList(list: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url, list, { headers: headers }).pipe(map((response: any) => response));
  }
}
