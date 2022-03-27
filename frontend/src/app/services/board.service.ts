import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { List } from 'src/app/shared/models/list.model';
import { Card } from 'src/app/shared/models/card.model';

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  url: string = 'board/lists/';
  lists!: List[];
  lists$: any;
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getLists$() {
    return this.lists$;
  }

  getListsData(userId: string) {
    const params = new HttpParams().set('userId', userId);
    return this.http.get(this.url, { params }).pipe(map((response: any) => response));
  }

  addList(list: List) {
    return this.http.post(this.url, list, { headers: this.headers }).pipe(map((response: any) => response));
  }

  changeList(data: any) {
    return this.http.patch(this.url + data._id, data, { headers: this.headers }).pipe(map((response: any) => response));
  }

  deleteList(id: string) {
    return this.http.delete(this.url + id, { headers: this.headers }).pipe(map((response: any) => response));
  }

  addCard(card: Card, id: string) {
    return this.http.post(this.url + id + '/cards', card, { headers: this.headers }).pipe(map((response: any) => response));
  }

  deleteCard(cardId: string, listId: string) {
    return this.http.delete(this.url + listId + '/cards/' + cardId, { headers: this.headers }).pipe(map((response: any) => response));
  }

}
