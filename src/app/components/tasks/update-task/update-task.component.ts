import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiTaskService } from 'src/app/services/Task/api-task.service';
import { ApiUserService } from 'src/app/services/User/api-user.service';
import { ListTaskComponent } from '../list-task/list-task.component';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

    form1: FormGroup;
    customerData: any;
    error: boolean = false;
    msgError: string = '';
    users: any;
    taskData: any;


    constructor(
      private apiT: ApiTaskService,
      private apiU: ApiUserService,
      private fb: FormBuilder,
      private router: Router) { 
        this.taskData = history.state
        console.log("constructor", this.taskData)
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
                "id": history.state.id,
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
    
          this.apiT.changeTask(this.customerData)
            .subscribe((data: any) => {
              this.router.navigate(['/listTasks'])
            }, (errorServicio) => {
              this.error = true;
              console.log(errorServicio.error.message)
              this.msgError = errorServicio.error.message
            });
          }
        
    }

    getUsers() {
      console.log('get users')
      this.apiU.getUsers()
        .subscribe((data: any) => {
          this.users = data.data.info
          console.log(this.users)
          this.loadData();
        }, (errorServicio) => {
          console.log('HOLITAAAS')
          console.log(errorServicio);
        });
    }

    loadData(){
      this.form1.patchValue({
        description: this.taskData.description,
        user: this.taskData.user_id.id,
        state: this.taskData.state
      })
    }
}
