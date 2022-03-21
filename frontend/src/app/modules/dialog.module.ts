import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogFormComponent } from '../components/dialog/dialog-form/dialog-form.component';


@NgModule({
  declarations: [
    DialogComponent,
    DialogFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule
  ],
  exports: [DialogComponent]
})
export class DialogModule { }
