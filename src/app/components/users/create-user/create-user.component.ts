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
  error: boolean = false;
  msgError: string = '';

  constructor(
    private apiU: ApiUserService, 
    private listUser: ListUsersComponent,
    private fb: FormBuilder,
    private router: Router) { 
      this.createForm()
    }

  ngOnInit() {
  }

  get nameNoValid() {
    return this.form1.get('name').invalid && this.form1.get('name').touched
  }

  createForm(){
    this.form1 = this.fb.group({
      name: ['', [Validators.required],],
    })
  }

  saveUser(){
    this.customerData = 
      {
        "name" : this.form1.value.name,
      }

      if (this.form1.invalid) {
        console.log("formulario invalido")
        Object.values(this.form1.controls).forEach(control => {
          console.log("marcando malos")
          control.markAsTouched();
        })
        return;
      } else {
  
        this.apiU.createUser(this.customerData)
          .subscribe((data: any) => {
            this.closeUser();
          }, (errorServicio) => {
            this.error = true;
            console.log(errorServicio.error.message)
            this.msgError = errorServicio.error.message
          });
        }
      
  }

  closeUser()
  {
    this.listUser.closeUser();
  }

}
