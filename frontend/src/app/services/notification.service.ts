import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  messageText!: string;
  visible!: boolean;
  hideMessageTimeout!: any;
  color!: string;

  showMessage(text: string, status: boolean) {
    this.messageText = text;
    if (status) {
      this.color = 'rgb(5, 163, 55)';
    } else {
      this.color = 'red';
    }
    this.visible = true;
    clearTimeout(this.hideMessageTimeout);
    this.hideMessage();
  }

  private hideMessage() {
    this.hideMessageTimeout = setTimeout(() => this.visible = false, 3000);
  }
  
}
