import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/AuthGuard/auth-guard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;

  constructor(private canActivate:  AuthGuardService, private router: Router) { 
  }

  ngOnInit() {
    this.isLogin = this.canActivate.canActivate();
  }

  isLoginUser(isLogin: boolean){
    this.isLogin = isLogin;
  }

  logout(){
    this.canActivate.logout()
    .subscribe((data: any) => {
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
      this.isLogin = false;
    }, (errorServicio) => {
      console.log(errorServicio.error.error)
    });
  }

}
