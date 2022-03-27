import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from '@modules/dialog.module';
import { BoardPageComponent } from '@components/board-page/board-page.component';
import { ListComponent } from '@components/board-page/list/list.component';
import { CardComponent } from '@components/board-page/card/card.component';

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
    MatButtonModule,
    DragDropModule
  ],
  exports: [BoardPageComponent]
})
export class BoardPageModule { }
