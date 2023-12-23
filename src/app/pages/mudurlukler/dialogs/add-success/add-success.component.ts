import { Component } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-success',
  templateUrl: './add-success.component.html',
  styleUrl: './add-success.component.css'
})
export class AddSuccessComponent {
  constructor(
    public dialogRef: MatDialogRef<AddSuccessComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
