import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardService } from '@services/board.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {

  userId = JSON.parse(sessionStorage.getItem('user')!).id;

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getListsData(this.userId).subscribe(data => {
      if (data.success) {
        this.boardService.lists = data.lists;
        this.boardService.lists$ = new BehaviorSubject<any[]>(this.boardService.lists);
      }
    });
  }
  
}
