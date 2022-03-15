import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegistrationService } from 'src/app/services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.scss']
})
export class RegPageComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', [Validators.required, Validators.email]],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', [Validators.required, Validators.minLength(8)]],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  success: boolean = true;
  message!: string;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private regService: RegistrationService,
    private router: Router
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
  }

  registerUser() {
    if (!this.firstFormGroup.get('firstCtrl')?.invalid) {
      if (!this.secondFormGroup.get('secondCtrl')?.invalid &&
        this.secondFormGroup.get('secondCtrl')?.value === this.thirdFormGroup.get('thirdCtrl')?.value) {
        const userData = {
          email: this.firstFormGroup.get('firstCtrl')?.value,
          password: this.secondFormGroup.get('secondCtrl')?.value
        }
        this.regService.register(userData).subscribe(data => {
          if (!data.success) {
            this.success = false;
            this.message = data.msg;
          } else {
            this.message = data.msg;
            this.router.navigate(['/auth']);
          }
        });
      }
    }
  }

}
