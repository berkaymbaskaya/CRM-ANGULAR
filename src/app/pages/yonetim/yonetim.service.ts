import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usersRoleModel } from 'src/app/interfaces/main-interfaces';
import { yetkiliKullanicilarModel } from 'src/app/pages/yonetim/interfaces/yonetim-interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class YonetimService {

  private apiUrl = 'https://cbs.elazig.bel.tr/surecyonetim';
  constructor(
    private http: HttpClient
  ) { }

  getUserList(mudurlukno: any): any {
    const token = "Bearer " + localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? token : ''
    });
    console.log("isetk atılan URL", `${this.apiUrl}/users?mudurlukno=${mudurlukno}`)
    return this.http.get(`${this.apiUrl}/users?mudurlukno=${mudurlukno}`, { headers: headers })
  }
  addUser(data:usersRoleModel){
    const token = "Bearer " + localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? token : ''
    });
        return this.http.post(`${this.apiUrl}/usersrole/add`,data,{ headers: headers });
  }
  yetkiliKullanicilar():Observable<yetkiliKullanicilarModel[]>{
    const token = "Bearer " + localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? token : ''
    });
    return this.http.get<yetkiliKullanicilarModel[]>(`${this.apiUrl}/usersrole`,{ headers: headers })
  }
  yetkiliKullanicilarFilter(mudurlukno: number): Observable<yetkiliKullanicilarModel[]> {
    console.log("gelen", mudurlukno)
    let data = {
      mudurluk_no: mudurlukno
    }
    const token = "Bearer " + localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? token : ''
    });
    return this.http.post<yetkiliKullanicilarModel[]>(`${this.apiUrl}/usersrole/filter`, data, { headers: headers })

  }
  addUserFromTc(tc: string) {
    const token = "Bearer " + localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? token : ''
    });
    return this.http.get(`${this.apiUrl}/usersrole/addFromTc?tc=${tc}`, { headers: headers });

  }

}
