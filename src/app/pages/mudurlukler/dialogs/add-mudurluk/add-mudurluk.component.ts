import { Component } from '@angular/core';
import { MudurluklerService } from 'src/app/pages/mudurlukler/mudurlukler.service';
import { AddSuccessComponent } from '../add-success/add-success.component';
import { MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { MudurlukModel, addResult } from '../../interfaces/mudurlukler-interface';
@Component({
  selector: 'app-add-mudurluk',
  templateUrl: './add-mudurluk.component.html',
  styleUrl: './add-mudurluk.component.css',
})
export class AddMudurlukComponent {

  addData:MudurlukModel={
    adi:"",
    kodu:0
  }
  constructor(
    private MudurluklerService: MudurluklerService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddMudurlukComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addMudurluk() {
     this.MudurluklerService.addMudurluk(this.addData).subscribe(
        (response: addResult) => {
          if(response.status === true){
            this.dialog.open(AddSuccessComponent, {
            });
            this.dialogRef.close();
          }
          else if(response.status === false){
            console.log(response.message)
          }
        },
        (error: any) => {
          console.error('Bir hata oluştu:', error);
        } 
      )  
  }
}
