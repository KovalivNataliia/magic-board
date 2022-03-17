import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  hide: boolean = true;
  success: boolean = true;
  message!: string;

  form = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private _formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const userData = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }
    this.authService.authUser(userData).subscribe(data => {
      if (!data.success) {
        this.success = false;
        this.message = data.msg;
      } else {
        this.message = data.msg;
        this.router.navigate(['/board']);
        this.authService.storeUser(data.token, data.user)
      }
    });
  }

}
