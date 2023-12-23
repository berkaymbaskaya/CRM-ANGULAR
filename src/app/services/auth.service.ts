import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginDataModel } from '../pages/login/interfaces/login-interface';
import { ReturnStatement } from '@angular/compiler';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://cbs.elazig.bel.tr/surecyonetim';
  whenAuth: EventEmitter<string> = new EventEmitter(); // login olduğunda tetiklenir ve yetkiyi belirler
  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  login(data: loginDataModel): any {
    return this.http.get(`${this.apiUrl}/auth/login?tcno=${data.tcno}`)
  }
  usersYetki(formData:any){
    return this.http.post(`${this.apiUrl}/usersrole/filter`,formData)
  }
  getUserYetkiType(){
    let user:any=JSON.parse(localStorage.getItem('person')!)
    console.log(user)
    if(user){
      return user.yetki;
    }
    else{
      return "";
    }
  }
  getUserMudurluk(){
    let user:any=JSON.parse(localStorage.getItem('person')!)
    console.log(user.person_mudurluk)
    return user.person_mudurluk;
  }
  getUserInfoFromLocal(){
    let user:any=JSON.parse(localStorage.getItem('person')!)
    console.log(user)
    return user;
  }
  logOut(){
    localStorage.clear();
    sessionStorage.clear();
    console.log(3)
    this.router.navigate(['login'])
  
  }

}
