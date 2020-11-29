import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/User/api-user.service';
import { ListUsersComponent } from '../list-users/list-users.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  form1: FormGroup;
  customerData: any;

  constructor(
    private apiU: ApiUserService, 
    private listUser: ListUsersComponent,
    private fb: FormBuilder,
    private router: Router) { 
      this.crearFormulario()
    }

  ngOnInit() {
  }

  crearFormulario(){
    this.form1 = this.fb.group({
      name: ['', [Validators.required],],
    })
  }

  saveUser(){
    this.customerData = 
      {
        "name" : this.form1.value.name,
      }

        this.apiU.createUser(this.customerData)
          .subscribe((data: any) => {
            this.closeUser();
          }, (errorServicio) => {
            console.log('HOLITAAAS')
            console.log(errorServicio);
          });
      
  }

  closeUser()
  {
    this.listUser.closeUser();
  }

}
