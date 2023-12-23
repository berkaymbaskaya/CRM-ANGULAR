import { Component } from '@angular/core';
import { YonetimService } from 'src/app/pages/yonetim/yonetim.service';
import {MatSelectChange } from '@angular/material/select';
import {MatTableDataSource} from '@angular/material/table';
import { AddUserComponent } from '../../dialogs/add-user/add-user.component';
import { usersRoleModel } from 'src/app/interfaces/main-interfaces';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { saysisUserModel } from 'src/app/interfaces/main-interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { userYetkiModel } from 'src/app/interfaces/main-interfaces';
import { localUserModel } from 'src/app/interfaces/main-interfaces';
import { SuccessComponent } from 'src/app/dialogs/success/success.component';
import { FailComponent } from 'src/app/dialogs/fail/fail.component';
import { MudurluklerService } from 'src/app/pages/mudurlukler/mudurlukler.service';
interface Mudurluklist {
  birim_kodu: number;
  birim_adi: string;
};
interface UserList {
  kullanici: string;
}

@Component({
  selector: 'app-all-users',
  standalone: false,
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})

export class AllUsersComponent {
  panelOpenState = false;
  mudurluklist: Mudurluklist[] = [];
  userList: UserList[] = [];
  selectedUser:usersRoleModel | null=null;
  dataSource = new MatTableDataSource();
  columns = [
    {
      columnDef: 'tcno',
      header: 'TC',
    },
    {
      columnDef: 'kullanici',
      header: 'Kullanıcı Adı',
    },
    {
      columnDef: 'ad',
      header: 'Ad',
    },
    {
      columnDef: 'soy',
      header: 'Soyad',
    },
    {
      columnDef: 'Yetkilendir',
      header: 'Yetkilendir',
    }
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  secim:boolean=false;
  userYetki:userYetkiModel="viewer";
  currentUser:localUserModel;
  constructor(private YonetimService: YonetimService, public dialog: MatDialog, private authService:AuthService, private mudurluklerService:MudurluklerService) {

    this.currentUser=JSON.parse(localStorage.getItem('person')!);

    if(this.currentUser.yetki === "admin"){
      this.mudurluklerService.getMudurlukList().subscribe(
        (response: any) => {
          console.log(1);
          this.mudurluklist = response.sort((a: { birim_adi: string; }, b: { birim_adi: string; }) => (a.birim_adi > b.birim_adi) ? 1 : -1);
          console.log(this.mudurluklist)
        }
      );
      this.YonetimService.getUserList(9).subscribe(
        (response: any) => {
          const values = Object.values(response.servis.data);
          console.log(values)
          this.dataSource = new MatTableDataSource(values)
        }
      );
    }
    else if(this.currentUser.yetki === "creator"){
      this.YonetimService.getUserList(this.currentUser.person_mudurluk).subscribe(
        (response: any) => {
          const values = Object.values(response.servis.data);
          console.log(values)
          this.dataSource = new MatTableDataSource(values)
        }
      );
    }

  }
  ngOnInit(){
   this.userYetki= this.authService.getUserYetkiType();
   console.log( this.userYetki)
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectionChange(event: MatSelectChange): void {
      this.YonetimService.getUserList(event.value).subscribe(
      (response: any) => {
        const values = Object.values(response.servis.data);
        this.dataSource = new MatTableDataSource(values)
      }
    );
  };
  yetkilendir(item:saysisUserModel){
    this.selectedUser={
      ad: item.ad,
      cep: item.cep,
      email: item.email,
      kullaniciadi: item.kullanici,
      mudurluk_adi: item.person_mudurluk_acik,
      mudurluk_no: item.person_mudurluk,
      personkod: item.person_kod,
      soyadi: item.soy,
      sicil: item.sicilno,
      tc: item.tcno,
      persontype: item.person_ne,
      yetki:""
    }
    const dialogRef = this.dialog.open(AddUserComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        this.YonetimService.addUser(this.selectedUser!).subscribe((res:any)=>{
          console.log(res)
          if(res.status === true){
            const dialogRef = this.dialog.open(SuccessComponent, {
            });
          }
          else {
            const dialogRef = this.dialog.open(FailComponent, {
            });
          }
        })
      }

    });
  }

  

}