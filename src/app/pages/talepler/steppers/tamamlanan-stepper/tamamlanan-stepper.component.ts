import { Component, ViewChild } from '@angular/core';
import { TalepModel, filterDataTalepModel, updateDataTalepModel, updateResTalepModel} from 'src/app/pages/talepler/interfaces/talepler-interface';
import { AuthService } from 'src/app/services/auth.service';
import { TaleplerService } from 'src/app/pages/talepler/talepler.service';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tamamlanan-stepper',
  templateUrl: './tamamlanan-stepper.component.html',
  styleUrl: './tamamlanan-stepper.component.css'
})
export class TamamlananStepperComponent {
  userYetki: string = "";
  userMudurluk: string = "";
  filterDataComp: filterDataTalepModel = {
    durum: "tamamlandı",
  }
  updateData: updateDataTalepModel = {
    basvuruno: 0,
    durum: "",
    sorumlu_tc: "",
  }

  completedDataSource = new MatTableDataSource<TalepModel>();
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
  displayedOnayCols = this.columns.map(c => c.columnDef).filter(column => column !== 'gorevbuton');

  @ViewChild(MatTable) table!: MatTable<TalepModel>;

  constructor(
    private AuthService: AuthService,
    private TaleplerService: TaleplerService,
  ) {
    this.userYetki = this.AuthService.getUserYetkiType();
    this.userMudurluk = this.AuthService.getUserMudurluk();
    console.log(this.userYetki )
    console.log( this.userMudurluk )
    const filterTalepler =  () => { 
      this.TaleplerService.filterTalepler(this.filterDataComp).subscribe(
        (response: any) => {
          const values: TalepModel[] = Object.values(response);
          this.completedDataSource = new MatTableDataSource(values);
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
        this.filterDataComp.basvurulan_mudurlukno = this.userMudurluk;
        filterTalepler()
        break;
      }
      case "viewer": {
        this.displayedOnayCols = this.columns.map(c => c.columnDef).filter(column => column !== 'gorevbuton' && column !== 'onaybuton');
        this.filterDataComp.basvurulan_mudurlukno = this.userMudurluk;
        filterTalepler()
        break;
      }
    }
  };

  applyFilter(event: Event, dataSource: MatTableDataSource<TalepModel>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase(); // toUpperCase yapınca "yapıcak" kelimesini okumuyor(bekleyen talepler-filter)
  }

  checkTask(rowData: TalepModel) {
    console.log("check task");
    this.updateData.basvuruno = rowData.basvuruno
    this.updateData.durum = "onaylandı";
    this.updateData.sorumlu_tc = rowData.sorumlu_tc;
    this.TaleplerService.updateTalepler(this.updateData).subscribe(
      (response: updateResTalepModel) => {
        const index = this.completedDataSource.data.findIndex(item => item === rowData);
        if (index >= 0) {
          const removedItem = this.completedDataSource.data.splice(index, 1)[0];
          this.table.renderRows();
        }
      },
      (error: any) => {
        console.error('Bir hata oluştu:', error);
      } 
    )  
  }
}
