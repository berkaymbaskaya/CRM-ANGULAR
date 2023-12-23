import { Component, ViewChild } from '@angular/core';
import { GorevAtamaComponent } from 'src/app/pages/talepler/dialogs/gorev-atama/gorev-atama.component';
import { AuthService } from 'src/app/services/auth.service';
import { TaleplerService } from 'src/app/pages/talepler/talepler.service';
import { TalepModel, filterDataTalepModel } from 'src/app/pages/talepler/interfaces/talepler-interface';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bekleyen-stepper',
  templateUrl: './bekleyen-stepper.component.html',
  styleUrl: './bekleyen-stepper.component.css',
})
export class BekleyenStepperComponent {
  userYetki: string = "";
  userMudurluk: string = "";
  filterDataNonassign: filterDataTalepModel = {
    durum: 'bekliyor',
  };
  
  nonassignDataSource = new MatTableDataSource<TalepModel>();
  columns = [
    {
      columnDef: 'basvuruno',
      header: 'Başvuru No',
    },
    {
      columnDef: 'ad_soyad',
      header: 'Ad Soyad',
    },
    {
      columnDef: 'sicil',
      header: 'Sicil No',
    },
    {
      columnDef: 'telno',
      header: 'Telefon No',
    },
    {
      columnDef: 'mail',
      header: 'Mail',
    },
    {
      columnDef: 'calisilan_mudurlukno',
      header: 'Çalıştığı Birim',
    },
    {
      columnDef: 'basvurulan_mudurlukno',
      header: 'Başvurduğu Birim',
    },
    {
      columnDef: 'aciklama',
      header: 'Açıklama',
    },
    {
      columnDef: 'talep_tarihi',
      header: 'Talep Tarihi',
    },
    {
      columnDef: 'durum',
      header: 'Durum',
    },
    {
      columnDef: 'sorumlu_tc',
      header: 'Sorumlu Kişi TC No',
    },
    {
      columnDef: 'gorevbuton',
      header: 'Görev Atama',
    },
    {
      columnDef: 'onaybuton',
      header: 'Onayla',
    },
  ];
  displayedGorevCols = this.columns.map(c => c.columnDef).filter(column => column !== 'onaybuton');

  @ViewChild(MatTable) table!: MatTable<TalepModel>;

  constructor(
    private AuthService: AuthService,
    private TaleplerService: TaleplerService,
    private dialog: MatDialog,
  ) {
    this.userYetki = this.AuthService.getUserYetkiType();
    this.userMudurluk = this.AuthService.getUserMudurluk();
    console.log(this.userYetki )
    console.log( this.userMudurluk )
    const filterTalepler =  () => { 
      this.TaleplerService.filterTalepler(this.filterDataNonassign).subscribe(
        (response: any) => {
          console.log(response)
          const values: TalepModel[] = Object.values(response);
          this.nonassignDataSource = new MatTableDataSource(values);
        },
        (error: any) => {
          console.error('Bir hata oluştu:', error);
        } 
      ) 
    }
    switch (this.userYetki) {
      case "admin": {
        filterTalepler()
        break;
      }
      case "creator": {
        this.filterDataNonassign.basvurulan_mudurlukno = this.userMudurluk
        filterTalepler()
        break;
      }
      case "viewer": {
        this.displayedGorevCols = this.columns.map(c => c.columnDef).filter(column => column !== 'gorevbuton' && column !== 'onaybuton');
        this.filterDataNonassign.basvurulan_mudurlukno = this.userMudurluk
        filterTalepler()
        break;
      }
    }
  };

  applyFilter(event: Event, dataSource: MatTableDataSource<TalepModel>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase(); // toUpperCase yapınca "yapıcak" kelimesini okumuyor(bekleyen talepler-filter)
  }

  assignTask(rowData: TalepModel) {
    const dialogRef = this.dialog.open(GorevAtamaComponent, {
      data: { rowData: rowData }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        const index = this.nonassignDataSource.data.findIndex(item => item === rowData);
        if (index >= 0) {
          const removedItem = this.nonassignDataSource.data.splice(index, 1)[0];
          this.table.renderRows();
        }
      }
    });
  }

}
