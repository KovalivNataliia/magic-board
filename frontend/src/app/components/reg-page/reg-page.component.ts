import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegistrationService } from 'src/app/services/registration.service';
import { NotificationService } from 'src/app/services/notification.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.scss']
})
export class RegPageComponent {

  firstFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  secondFormGroup = this._formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  thirdFormGroup = this._formBuilder.group({
    repeatPassword: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  hide: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private regService: RegistrationService,
    private router: Router,
    private notification: NotificationService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  registerUser() {
    if (!this.firstFormGroup.get('email')?.invalid) {
      if (!this.secondFormGroup.get('password')?.invalid &&
        this.secondFormGroup.get('password')?.value === this.thirdFormGroup.get('repeatPassword')?.value) {
        const userData: User = {
          email: this.firstFormGroup.get('email')?.value,
          password: this.secondFormGroup.get('password')?.value
        }
        this.regService.regUser(userData).subscribe(data => {
          if (!data.success) {
            this.notification.showMessage(data.msg, data.success)
          } else {
            this.notification.showMessage(data.msg, data.success)
            this.router.navigate(['/auth']);
          }
        });
      } else {
        this.notification.showMessage('Passwords don\'t match', false);
      }
    } else {
      this.notification.showMessage('Check your email', false);
    }
  }
  
}
