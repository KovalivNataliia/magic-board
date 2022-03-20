import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDialogModule } from './add-dialog.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { BoardPageComponent } from '../components/board-page/board-page.component';
import { ListComponent } from './../components/board-page/list/list.component';



@NgModule({
  declarations: [
    BoardPageComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    AddDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [BoardPageComponent]
})
export class BoardPageModule { }
