import { Component } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-fail',
  standalone: false,
  templateUrl: './fail.component.html',
  styleUrl: './fail.component.css'
})
export class FailComponent {
  constructor(
    public dialogRef: MatDialogRef<FailComponent>,
  ) {
  }
  close() {
    this.dialogRef.close({karar:false,tc:0});
  }
}
