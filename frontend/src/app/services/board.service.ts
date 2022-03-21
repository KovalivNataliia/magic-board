import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { List } from 'src/app/models/list.model';


@Injectable({
  providedIn: 'root'
})

export class BoardService {

  url: string = 'http://localhost:3000/board/list/';
  lists!: List[];
  lists$: any;

  constructor(private http: HttpClient) { }

  getLists$() {
    return this.lists$;
  }

  getListsData(userId: string) {
    const params = new HttpParams().set('userId', userId);
    return this.http.get(this.url, { params: params }).pipe(map((response: any) => response));
  }

  addList(list: List) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url, list, { headers: headers }).pipe(map((response: any) => response));
  }

  changeList(listData: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.patch(this.url + listData.id, listData, { headers: headers }).pipe(map((response: any) => response));
  }

  deleteList(id: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.url + id, { headers: headers }).pipe(map((response: any) => response));
  }
}
