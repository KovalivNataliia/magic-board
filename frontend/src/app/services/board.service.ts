import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { List } from 'src/app/shared/models/list.model';
import { Card } from 'src/app/shared/models/card.model';

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  url: string = 'http://localhost:3000/board/lists/';
  lists!: List[];
  lists$: any;

  constructor(private http: HttpClient) { }

  getLists$() {
    return this.lists$;
  }

  getListsData(userId: string) {
    const params = new HttpParams().set('userId', userId);
    return this.http.get(this.url, { params }).pipe(map((response: any) => response));
  }

  addList(list: List) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url, list, { headers: headers }).pipe(map((response: any) => response));
  }

  changeList(text: string, id: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.patch(this.url + id, { text }, { headers: headers }).pipe(map((response: any) => response));
  }

  deleteList(id: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.url + id, { headers: headers }).pipe(map((response: any) => response));
  }

  addCard(card: Card, id: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + id + '/cards', card, { headers: headers }).pipe(map((response: any) => response));
  }
}
