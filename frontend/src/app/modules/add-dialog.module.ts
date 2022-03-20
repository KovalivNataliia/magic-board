import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AddDialogComponent } from '../components/add-dialog/add-dialog.component';
import { AddFormComponent } from '../components/add-dialog/add-form/add-form.component';


@NgModule({
  declarations: [
    AddDialogComponent,
    AddFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule
  ],
  exports: [AddDialogComponent]
})
export class AddDialogModule { }
