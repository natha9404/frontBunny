import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/AuthGuard/auth-guard.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form1: FormGroup;
  customerData: any;
  error: boolean = false;
  msgError: string = '';

  constructor(
    private apiG: AuthGuardService, 
    private fb: FormBuilder,
    private router: Router) { 
      this.createForm()
    }

  ngOnInit() {
  }

  get usernameNoValid() {
    return this.form1.get('username').invalid && this.form1.get('username').touched
  }

  get passwordNoValid() {
    return this.form1.get('password').invalid && this.form1.get('password').touched
  }

  createForm(){
    this.form1 = this.fb.group({
      username: ['', [Validators.required],],
      password: ['', [Validators.required],],
    })
  }

  login(){
    this.customerData = 
      {
        "username" : this.form1.value.username,
        "password" : this.form1.value.password,
      }

      if (this.form1.invalid) {
        console.log("formulario invalido")
        Object.values(this.form1.controls).forEach(control => {
          console.log("marcando malos")
          control.markAsTouched();
        })
        return;
      } else {
  
        console.log(this.customerData)
        this.apiG.login(this.customerData)
          .subscribe((data: any) => {
            localStorage.setItem('token', data.token)
            this.router.navigate(['/listTasks'])
          }, (errorServicio) => {
            this.error = true;
            console.log(errorServicio.error.error)
            this.msgError = errorServicio.error.error
          });
        }
      
  }

}
