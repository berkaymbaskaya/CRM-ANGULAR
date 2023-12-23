import { Component, ViewChild } from '@angular/core';
import { MudurluklerService } from 'src/app/pages/mudurlukler/mudurlukler.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { AddMudurlukComponent } from './dialogs/add-mudurluk/add-mudurluk.component';
import { MudurlukModel } from './interfaces/mudurlukler-interface';
import { userYetkiModel } from 'src/app/interfaces/main-interfaces';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-mudurlukler',
  templateUrl: './mudurlukler.component.html',
  styleUrl: './mudurlukler.component.css'
})
export class MudurluklerComponent {
  mudurluklist: MudurlukModel[] = [];
  dataSource = new MatTableDataSource();
  filterMudurKeyword: string | null = null
  columns = [
    {
      columnDef: 'birim_kodu',
      header: 'Kodu',
    },
    {
      columnDef: 'birim_adi',
      header: 'Müdürlük Adı',
    },
    // {
    //   columnDef: 'buton',
    //   header: 'buton',
    // },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  userYetki:userYetkiModel="viewer";
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(
    private MudurluklerService: MudurluklerService,
    private dialog: MatDialog,
    private authService:AuthService) { }

  ngAfterViewInit() {
    this.MudurluklerService.getMudurlukList().subscribe(
      (response: any) => {
        this.mudurluklist = response.sort((a: { kodu: number }, b: { kodu: number }) => (a.kodu - b.kodu));
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
      },
    );
  }
  ngOnInit(){
    this.userYetki=this.authService.getUserYetkiType();
  }

  applyFilter() {
    if (this.filterMudurKeyword != undefined) {
      this.dataSource.filter = this.filterMudurKeyword.trim().toUpperCase();
    }
  }

  addMudurluk() {
    const dialogRef = this.dialog.open(AddMudurlukComponent, { });
    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('The dialog was closed');
    });
  }


}
