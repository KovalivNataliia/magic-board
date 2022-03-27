import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent {

  showColorPanel = false;

  constructor(public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.showColorPanel = data.showColorPanel;
  }

  setColor(event: any) {
    this.data.color = event.color;
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
