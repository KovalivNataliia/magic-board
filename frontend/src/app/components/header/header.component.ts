import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { BoardService } from './../../services/board.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {

  isLoggedIn!: boolean;
  userId!: string;

  constructor(
    private auth: AuthService,
    private boardService: BoardService,
    private notification: NotificationService
  ) { }

  ngDoCheck(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  logOut() {
    this.auth.logOut()
  }

  addList(text: string) {
    if (text) {
      this.userId = JSON.parse(sessionStorage.getItem('user')!).id;
      const list = {
        title: text,
        userId: this.userId
      }

      this.boardService.addList(list).subscribe(data => {
        if (!data.success) {
          this.notification.showMessage(data.msg, data.success);
        } else {
          this.boardService.lists.push(list);
          this.boardService.lists$.next(this.boardService.lists)
        };
      })
    }
  }
}
