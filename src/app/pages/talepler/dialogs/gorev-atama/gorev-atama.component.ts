import { Component, Inject  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TaleplerService } from 'src/app/pages/talepler/talepler.service';
import { updateDataTalepModel, updateResTalepModel, userDataModel, UserListModel } from '../../interfaces/talepler-interface';

@Component({
  selector: 'app-gorev-atama',
  templateUrl: './gorev-atama.component.html',
  styleUrl: './gorev-atama.component.css'
})

export class GorevAtamaComponent {
  
  userData: userDataModel = {
    mudurlukno:"",
  }
  updateData: updateDataTalepModel = {
    basvuruno: 0,
    durum: "",
    sorumlu_tc: "",
  }
  userList: UserListModel[] = [];
  selectedUser: any;
  userName: any;
  status: boolean = false;

  constructor(
    private dialog: MatDialog,
    private TaleplerService: TaleplerService,
    public dialogRef: MatDialogRef<GorevAtamaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.userData.mudurlukno = data.rowData.basvurulan_mudurlukno
    this.TaleplerService.getUserList(this.userData).subscribe(
      (response: any) => {
        console.log(response.servis.data)
        this.userList = Object.values(response.servis.data);
        console.log(this.userList)
      }
    );
    this.updateData = {
      basvuruno: data.rowData.basvuruno,
      durum: data.rowData.durum,
      sorumlu_tc: data.rowData.sorumlu_tc ,
    };
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  assignTask() {
    const tcno = this.selectedUser[0].tcno;
    this.updateData.sorumlu_tc = tcno;
    this.updateData.durum = "süreçte";
    this.TaleplerService.updateTalepler(this.updateData).subscribe(
      (response: updateResTalepModel) => {
        this.dialogRef.close(response.status);
      },
      (error: any) => {
        console.error('Bir hata oluştu:', error);
      } 
    )  
  }

  
}
