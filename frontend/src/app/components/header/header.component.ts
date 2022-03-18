import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {

  isLoggedIn!: boolean;

  constructor(private auth: AuthService) { }

  ngDoCheck(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  logOut() {
    this.auth.logOut()
  }
}
