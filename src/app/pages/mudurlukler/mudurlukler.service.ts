import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MudurlukModel } from 'src/app/pages/mudurlukler/interfaces/mudurlukler-interface';
import { AuthService } from 'src/app/services/auth.service';
 

@Injectable({
  providedIn: 'root'
})
export class MudurluklerService {

  private apiUrl = 'https://cbs.elazig.bel.tr/surecyonetim';
  constructor(private http: HttpClient, private authService:AuthService) { };
 

  getMudurlukList(): any {
    const token = "Bearer " + localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? token : ''
    });
    console.log("isetk atılan URL",`${this.apiUrl}/mudurlukler`)
    return this.http.get(`${this.apiUrl}/mudurlukler`,{headers:headers})
  }
  
  addMudurluk(data:MudurlukModel): any {
    console.log("isetk atılan URL",`${this.apiUrl}/mudurlukler/add`);
    const token="Bearer " + localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token? token : ''
    });
    return this.http.post(`${this.apiUrl}/mudurlukler/add`,data, {headers:headers});
  }
  
}
