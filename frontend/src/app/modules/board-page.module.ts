import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardPageComponent } from '../components/board-page/board-page.component';


@NgModule({
  declarations: [BoardPageComponent],
  imports: [
    CommonModule
  ],
  exports: [BoardPageComponent]
})
export class BoardPageModule { }
