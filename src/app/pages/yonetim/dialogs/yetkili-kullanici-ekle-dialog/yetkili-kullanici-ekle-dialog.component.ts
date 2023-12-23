import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-yetkili-kullanici-ekle-dialog',
  standalone: false,
  templateUrl: './yetkili-kullanici-ekle-dialog.component.html',
  styleUrl: './yetkili-kullanici-ekle-dialog.component.css'
})
export class YetkiliKullaniciEkleDialogComponent {
  tc:number | null= null;
  constructor(
    public dialogRef: MatDialogRef<YetkiliKullaniciEkleDialogComponent>,
  ) {
  }

  close() {
    this.dialogRef.close({karar:false,tc:0});
  }
  add(){
    this.dialogRef.close({karar:true,tc:this.tc});
  };

}
