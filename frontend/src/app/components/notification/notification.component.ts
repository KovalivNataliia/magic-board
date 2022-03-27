import { Component, DoCheck } from '@angular/core';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements DoCheck {

  visible: boolean = false;
  messageText!: string;
  color!: string;

  constructor(private notification: NotificationService) { }

  ngDoCheck(): void {
    this.visible = this.notification.visible;
    this.messageText = this.notification.messageText;
    this.color = this.notification.color;
  }
  
}

