import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { updateDataTalepModel, userDataModel, filterDataTalepModel} from 'src/app/pages/talepler/interfaces/talepler-interface';

@Injectable({
  providedIn: 'root'
})
export class TaleplerService {

  private apiUrl = 'https://cbs.elazig.bel.tr/surecyonetim';
  constructor(
    private http : HttpClient
  ) { }

  getTalepler(): any {
    const token="Bearer " + localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token? token : ''
    });
    return this.http.get(`${this.apiUrl}/talepler`, {headers:headers})
  }

  filterTalepler(data:filterDataTalepModel): any {
    console.log(data)
    const token="Bearer " + localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token? token : ''
    });
    return this.http.post(`${this.apiUrl}/talepler/filter`, data, {headers:headers});
  }

  updateTalepler(data:updateDataTalepModel): any {
    console.log(data)
    const token="Bearer " + localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token? token : ''
    });
    return this.http.post(`${this.apiUrl}/talepler/update`, data, {headers:headers});
  }

  getUserList(data: userDataModel): any {
    console.log(data)
    const token="Bearer " + localStorage.getItem('access_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token? token : ''
    });
    return this.http.get(`${this.apiUrl}/users?mudurlukno=${data.mudurlukno}`, {headers:headers})
  }
}
