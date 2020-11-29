import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ApiTaskService } from 'src/app/services/Task/api-task.service';
import { ApiUserService } from 'src/app/services/User/api-user.service';
import { ListTaskComponent } from '../list-task/list-task.component';

class User {
  constructor(
    public name: string
  ) { }
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  form1: FormGroup;
  customerData: any;
  error: boolean = false;
  msgError: string = '';
  users: any;


  constructor(
    private apiT: ApiTaskService,
    private apiU: ApiUserService,  
    private listTask: ListTaskComponent,
    private fb: FormBuilder,
    private router: Router) { 
      this.createForm()
      this.getUsers();
    }

  ngOnInit() {
  }

  get descriptionNoValid() {
    return this.form1.get('description').invalid && this.form1.get('description').touched
  }

  get userNoValid() {
    return this.form1.get('user').invalid && this.form1.get('user').touched
  }

  get stateNoValid() {
    return this.form1.get('state').invalid && this.form1.get('state').touched
  }

  createForm(){
    this.form1 = this.fb.group({
      description: ['', [Validators.required],],
      user: ['', [Validators.required],],
      state: ['', [Validators.required],],

    })
  }

  saveTask(){
    this.customerData = 
        {
          "task": {
              "description": this.form1.value.description,
              "state": this.form1.value.state,
              "user_id": this.form1.value.user
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
  
        this.apiT.createTask(this.customerData)
          .subscribe((data: any) => {
            this.closeTask();
          }, (errorServicio) => {
            this.error = true;
            console.log(errorServicio.error.message)
            this.msgError = errorServicio.error.message
          });
        }
      
  }

  closeTask()
  {
    this.listTask.closeTask();
  }

  getUsers() {
    console.log('get users')
    this.apiU.getUsers()
      .subscribe((data: any) => {
        this.users = data.data.info
        console.log(this.users)
      }, (errorServicio) => {
        console.log('HOLITAAAS')
        console.log(errorServicio);
      });
  }

}
