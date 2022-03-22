import { Component, Input } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { NotificationService } from 'src/app/services/notification.service';
import { List } from 'src/app/shared/models/list.model';
import { Card } from 'src/app/shared/models/card.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() list!: List;

  constructor(
    private boardService: BoardService,
    private notification: NotificationService
  ) { }


  changeListTitle(data: any, id: string) {
    if (data) {
      const text = data[0];

      this.boardService.changeList(text, id).subscribe(data => {
        if (!data.success) {
          this.notification.showMessage(data.msg, data.success);
        } else {
          this.boardService.lists.map(list => {
            if (list._id === id) {
              list.title = text;
            }
          });
          this.boardService.lists$.next(this.boardService.lists)
        };
      })
    }
  }

  deleteList(id: string) {
    this.boardService.deleteList(id).subscribe(data => {
      if (!data.success) {
        this.notification.showMessage(data.msg, data.success);
      } else {
        this.boardService.lists.map((list, idx, arr) => {
          if (list._id === id) {
            arr.splice(idx, 1);
          }
        });
        this.boardService.lists$.next(this.boardService.lists)
      };
    })
  }

  addCard(data: any, listId: string) {
    if (data) {
      const text = data[0];
      const color = data[1] || '#FFC0CB';
      const card: Card = { text, color}

      this.boardService.addCard(card, listId).subscribe(data => {
        if (!data.success) {
          this.notification.showMessage(data.msg, data.success);
        } else {
          this.boardService.lists.map((list, idx, arr) => {
            if (list._id === listId) {
              list.cards!.push(data.newCard);
            }
          });
          this.boardService.lists$.next(this.boardService.lists)
        };
      })
    }
  }

}
