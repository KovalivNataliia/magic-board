import { Component, Input } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { NotificationService } from 'src/app/services/notification.service';
import { List } from 'src/app/shared/models/list.model';
import { Card } from 'src/app/shared/models/card.model';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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


  changeListTitle(data: any, _id: string) {
    if (data) {
      const text = data[0];

      this.boardService.changeList({ text, _id }).subscribe(data => {
        if (!data.success) {
          this.notification.showMessage(data.msg, data.success);
        } else {
          this.boardService.lists.map(list => {
            if (list._id === _id) {
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
      const card: Card = { text, color }

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

  deleteCard(event: any, listId: string) {
    this.boardService.deleteCard(event.cardId, listId).subscribe(data => {
      if (!data.success) {
        this.notification.showMessage(data.msg, data.success);
      } else {
        this.boardService.lists.map(list => {
          if (list._id === listId) {
            list.cards.map((card, idx, arr) => {
              if (card._id === event.cardId) {
                arr.splice(idx, 1);
              }
            })
          }
        });
        this.boardService.lists$.next(this.boardService.lists)
      };
    })
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.cards, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data.cards,
        event.container.data.cards,
        event.previousIndex,
        event.currentIndex,
      );
      this.boardService.changeList(event.container.data).subscribe(data => {
        if (!data.success) this.notification.showMessage(data.msg, data.success);
      })
      this.boardService.changeList(event.previousContainer.data).subscribe(data => {
        if (!data.success) this.notification.showMessage(data.msg, data.success);
      });
    }
  }

}
