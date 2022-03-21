import { Component, OnInit, Input } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { NotificationService } from 'src/app/services/notification.service';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list!: List;

  constructor(private boardService: BoardService, private notification: NotificationService) { }

  ngOnInit(): void {
  }

  changeListTitle(text: string, id: string) {
    if (text) {
      const listData = { id, text };

      this.boardService.changeList(listData).subscribe(data => {
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

}
