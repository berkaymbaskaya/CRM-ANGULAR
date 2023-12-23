import { Component, ViewChild } from '@angular/core';
import { TalepModel, filterDataTalepModel} from 'src/app/pages/talepler/interfaces/talepler-interface';
import { AuthService } from 'src/app/services/auth.service';
import { TaleplerService } from 'src/app/pages/talepler/talepler.service';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-atanan-stepper',
  templateUrl: './atanan-stepper.component.html',
  styleUrl: './atanan-stepper.component.css'
})
export class AtananStepperComponent {
  userYetki: string = "";
  userMudurluk: string = "";
  filterDataAssign: filterDataTalepModel = {
    durum: "süreçte",
  }
  assignDataSource = new MatTableDataSource<TalepModel>();
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
  ]; //???
  displayedCols = this.columns.map(c => c.columnDef).filter(column => column !== 'gorevbuton' && column !== 'onaybuton');

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
      this.TaleplerService.filterTalepler(this.filterDataAssign).subscribe(
        (response: any) => {
          const values: TalepModel[] = Object.values(response);
          this.assignDataSource = new MatTableDataSource(values);
        },
        (error: any) => {
          console.error('Bir hata oluştu:', error);
        } 
      )
    }
    switch (this.userYetki) {
      case "admin": {
        filterTalepler();
        break;
      }
      case "creator": {
        this.filterDataAssign.basvurulan_mudurlukno = this.userMudurluk
        filterTalepler();
        break;
      }
      case "viewer": {
        this.filterDataAssign.basvurulan_mudurlukno = this.userMudurluk
        filterTalepler();
        break;
      }
    }
  };

  applyFilter(event: Event, dataSource: MatTableDataSource<TalepModel>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase(); // toUpperCase yapınca "yapıcak" kelimesini okumuyor(bekleyen talepler-filter)
  }
}
