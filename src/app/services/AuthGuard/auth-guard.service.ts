import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  urlApi: string;

  constructor(private http: HttpClient, private router: Router) {
    this.urlApi = environment.urlUser;
  }

  get(route: string) {
    const url = `${this.urlApi}${route}`;
    //Se obtiene el token de local storage
    const token = localStorage.getItem('token');
    // Se añade el token en los headers de las peticiones
    const headers = {
      'Authorization': 'Token '+token,
      'Content-Type': 'application/json'
    }
    return this.http.get<any>(url, { headers: headers });
  }

  postLogin(route: string, body) {
    const url = `${this.urlApi}${route}`;
    const headers = {
      'Content-Type': 'application/json'
    }
    return this.http.post<any>(url, body, { headers: headers });
  }

  post(route: string, body) {
    const url = `${this.urlApi}${route}`;
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': 'Token '+token,
      'Content-Type': 'application/json'
    }
    return this.http.post<any>(url, body, { headers: headers });
  }

  login(body) {
    return this.postLogin('login/', body)
      .pipe(map(data => data));
  }

  logout() {
    return this.post('logout/', '')
      .pipe(map(data => data));
  }

  canActivate() {
    if (localStorage.getItem('token')) {
      // logged in so return true
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
