import { Component, OnInit, Inject } from '@angular/core';
import { load } from '@angular/core/src/render3';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/User/api-user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  form1: FormGroup;
  customerData: any;
  error: boolean = false;
  msgError: string = '';
  closeUser:any;
  userData: any;
  
  constructor(private apiU: ApiUserService, 
    private fb: FormBuilder,
    private router: Router) {
      console.log('llegue')
    this.userData = history.state;
    console.log(this.userData)
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
    this.loadData()
  }

  loadData(){
    this.form1.patchValue({
      name: this.userData.name
    })
  }

  saveUser(){
    this.customerData = 
      {"user": {
        "id": this.userData.id,
        "name": this.form1.value.name,
    }
      }

      if (this.form1.invalid) {
        console.log("formulario invalido")
        Object.values(this.form1.controls).forEach(control => {
          console.log("marcando malos")
          control.markAsTouched();
        })
        return;
      } else {
  
        this.apiU.changeUser(this.customerData)
          .subscribe((data: any) => {
            this.router.navigate(['/listUsers'])
          }, (errorServicio) => {
            this.error = true;
            console.log(errorServicio.error.message)
            this.msgError = errorServicio.error.message
          });
        }
      
  }
}
