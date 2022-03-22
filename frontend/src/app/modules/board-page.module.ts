import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from './dialog.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { BoardPageComponent } from '../components/board-page/board-page.component';
import { ListComponent } from './../components/board-page/list/list.component';
import { CardComponent } from '../components/board-page/card/card.component';



@NgModule({
  declarations: [
    BoardPageComponent,
    ListComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [BoardPageComponent]
})
export class BoardPageModule { }
