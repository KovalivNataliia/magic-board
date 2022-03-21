import { Component, OnInit, Input } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: any;

  constructor(private boardService: BoardService, private notification: NotificationService) { }

  ngOnInit(): void {
  }

  changeListTitle(text: string, id: string) {
    if (text) {
      const list = {id, text};

      this.boardService.changeList(list).subscribe(data => {
        if (!data.success) {
          this.notification.showMessage(data.msg, data.success);
        } else {
          this.boardService.lists.map((list: any) => {
            if (list._id === id) {
              list.title = text;
            }
          });
          this.boardService.lists$.next(this.boardService.lists)
        };
      })
    }
  }

}
