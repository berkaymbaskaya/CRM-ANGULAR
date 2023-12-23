import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginalertComponent } from 'src/app/dialogs/loginalert/loginalert.component';
import { loginDataModel , loginCodeModel, loginDialog } from '../login/interfaces/login-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginData: loginDataModel={
    tcno:'35581332370',
  }
  
  smscode: string = '';
  status: boolean = false;
  hide = true;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private dialog: MatDialog,
  ) {}

  sendCode() {
    this.authService.login(this.loginData).subscribe(
      (response: loginCodeModel) => {
        this.status = response.status;
        if(response.status) {
          console.log(response);
          localStorage.setItem('person',JSON.stringify(response.person))
          localStorage.setItem('access_token',response.token);
          this.authService.whenAuth.emit(response.person.yetki);
          const formData={
            tc:response.person.tcno
          }
          console.log(formData)
          this.authService.usersYetki(formData).subscribe((res:any)=>{
            console.log(res);
            this.router.navigate(['/anasayfa']);
          })  
          // localStorage.setItem('person',JSON.stringify(response.person));
          // this.router.navigate(['/anasayfa']);

          // const dialogRef = this.dialog.open(LoginalertComponent, {
          //   data: {tel: response.person.cep, status: response.status},
          // });

          // dialogRef.afterClosed().subscribe((result: string) => {
          //   this.smscode = result;
          // });
        }
        else {
          const dialogRef = this.dialog.open(LoginalertComponent, {
            data: {status: response.status},
          });
          // dialogRef.afterClosed().subscribe((result: string) => {
          //   this.smscode = result;
          // });
        }
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

  // login() {
  //   this.router.navigate(['/anasayfa']);

  // }

  openSnackBar() {
    
  }


}


