import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from './dialog-form/dialog-form.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  @Output() emitConfirm: EventEmitter<any> = new EventEmitter();
  @Input() title!: string;
  @Input() text!: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '400px',
      data: { title: this.title, text: this.text }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.emitConfirm.emit(result);
    });
  }

}
