import { Component,Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { generalResModel, saysisUserModel } from 'src/app/interfaces/main-interfaces';
import { usersRoleModel } from 'src/app/interfaces/main-interfaces';
import { YonetimService } from '../../yonetim.service';
import { addedUsersMole } from 'src/app/interfaces/main-interfaces';
@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {
  
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private yonetimService:YonetimService
  ) {
    console.log("gelen",this.data)
  }
  addUser(){
    this.dialogRef.close(true);

  }


}

