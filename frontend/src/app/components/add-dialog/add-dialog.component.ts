import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from './add-form/add-form.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})

export class AddDialogComponent implements OnInit {

  @Output() emitAddCard: EventEmitter<any> = new EventEmitter();
  @Input() title!: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '400px',
      data: { title: this.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.emitAddCard.emit(result);
    });
  }

}
