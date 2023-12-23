import { Component, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { loginDialog } from 'src/app/pages/login/interfaces/login-interface';

@Component({
  selector: 'app-loginalert',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './loginalert.component.html',
  styleUrl: './loginalert.component.css',
})
export class LoginalertComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginalertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: loginDialog,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
