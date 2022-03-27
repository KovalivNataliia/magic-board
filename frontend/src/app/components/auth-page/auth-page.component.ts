import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { NotificationService } from '@services/notification.service';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  hide: boolean = true;

  form = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) { }

  onSubmit() {
    const userData: User = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }
    this.authService.authUser(userData).subscribe(data => {
      if (!data.success) {
        this.notification.showMessage(data.msg, data.success);
      } else {
        this.notification.showMessage(data.msg, data.success);
        this.router.navigate(['/board']);
        this.authService.storeUser(data.token, data.user);
      }
    });
  }

}
