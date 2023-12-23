import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { localUserModel } from 'src/app/interfaces/main-interfaces';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
user:localUserModel |null=null;

constructor(private authService:AuthService){
  this.user=this.authService.getUserInfoFromLocal()

}
logOut(){
  this.authService.logOut();
}
}
