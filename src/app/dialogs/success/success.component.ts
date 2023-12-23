import { Component } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  standalone: false,
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessComponent>,
  ) {
  };
  close() {
    this.dialogRef.close({karar:false,tc:0});
  }
}
