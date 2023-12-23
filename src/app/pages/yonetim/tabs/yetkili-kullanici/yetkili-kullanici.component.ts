import { Component, ViewChild } from '@angular/core';
import { YonetimService } from '../../yonetim.service';
import { yetkiliKullanicilarModel } from '../../interfaces/yonetim-interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { YetkiliKullaniciEkleDialogComponent } from '../../dialogs/yetkili-kullanici-ekle-dialog/yetkili-kullanici-ekle-dialog.component';
import { yetkilendirelecekUserModel } from '../../interfaces/yonetim-interface';
import { SuccessComponent } from 'src/app/dialogs/success/success.component';
import { FailComponent } from 'src/app/dialogs/fail/fail.component';
import { AuthService } from 'src/app/services/auth.service';
import { saysisUserModel } from 'src/app/interfaces/main-interfaces';
@Component({
  selector: 'app-yetkili-kullanici',
  standalone: false,
  templateUrl: './yetkili-kullanici.component.html',
  styleUrl: './yetkili-kullanici.component.css'
})

export class YetkiliKullaniciComponent {
  yetkiliKullanicilar: yetkiliKullanicilarModel[] = new Array<yetkiliKullanicilarModel>();
  constructor(private yonetimService: YonetimService, private dialog: MatDialog, private authService: AuthService) { }
  dataSource: any = new MatTableDataSource();
  filteredUser: String = new String();
  displayedColumns: string[] = ["ad", "tc", "sicil", "cep", "email", "kullaniciadi", "mudurluk_adi","yetki","kaldır"];
  secim: boolean = false;
  @ViewChild("yetkiliUser") table!: MatTable<any>;
  userYetki: string = "";

  ngOnInit() {
    this.userYetki = this.authService.getUserYetkiType();
    console.log(this.userYetki )
    switch (this.userYetki) {
      case "admin": {
        this.yonetimService.yetkiliKullanicilar().subscribe((res: yetkiliKullanicilarModel[]) => {
          console.log(res);
          this.yetkiliKullanicilar = res;
          // this.dataSource=new MatTableDataSource<any>(this.yetkiliKullanicilar)
          this.dataSource = this.yetkiliKullanicilar;
          this.table.renderRows();

        })
        break;

      }
      case "creator": {
        let user:saysisUserModel = this.authService.getUserInfoFromLocal();
        console.log(user)
        this.yonetimService.yetkiliKullanicilarFilter(Number(user.person_mudurluk)).subscribe((res: yetkiliKullanicilarModel[]) => {
          console.log(res);
          this.yetkiliKullanicilar = res;
          // this.dataSource=new MatTableDataSource<any>(this.yetkiliKullanicilar)
          this.dataSource = this.yetkiliKullanicilar;
          this.table.renderRows();

        })
        break;
      }
    }
    this.yonetimService.yetkiliKullanicilar()
  }



  // ngOnInit() {
  //   this.yonetimService.yetkiliKullanicilar().subscribe((res: yetkiliKullanicilarModel[]) => {
  //     console.log(res);
  //     this.yetkiliKullanicilar = res;
  //     // this.dataSource=new MatTableDataSource<any>(this.yetkiliKullanicilar)
  //     this.dataSource=this.yetkiliKullanicilar;
  //     this.table.renderRows();

  //   })
  // };

  applyFilter() {
    this.dataSource.filter = this.filteredUser.trim().toLocaleLowerCase();
    console.log(this.filteredUser)
  }
  addYetkiliUser() {
    const dialogRef = this.dialog.open(YetkiliKullaniciEkleDialogComponent, {
    });
    dialogRef.afterClosed().subscribe((result: yetkilendirelecekUserModel) => {
      console.log('The dialog was closed');
      console.log("geri gelen data", result);
      if (result.karar === true) {
        this.yonetimService.addUserFromTc(result.tc).subscribe((res: any) => {
          console.log(res);
          if (res.status === true) {
            //
            const dialogRef = this.dialog.open(SuccessComponent, {
            });
            const newData: yetkiliKullanicilarModel = res.data;
            this.dataSource.push(newData);
            this.table.renderRows();
          }
          else if (res.status === false) {
            const dialogRef = this.dialog.open(FailComponent, {
            });
          }
        })
      }
    });
  }
}
