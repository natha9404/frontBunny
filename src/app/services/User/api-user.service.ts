import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.urlUser;
  }

  get(route: string) {
    console.log('HOLAA')
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

  post(route: string, body) {
    const url = `${this.urlApi}${route}`;
    //Se obtiene el token de local storage
    const token = localStorage.getItem('token');
    // Se añade el token en los headers de las peticiones
    const headers = {
      'Authorization': 'Token '+token,
      'Content-Type': 'application/json'
    }
    return this.http.post<any>(url, body, { headers: headers });
  }

  put(route: string, body) {
    const url = `${this.urlApi}${route}`;
    //Se obtiene el token de local storage
    const token = localStorage.getItem('token');
    // Se añade el token en los headers de las peticiones
    const headers = {
      'Authorization': 'Token '+token,
      'Content-Type': 'application/json'
    }
    return this.http.put<any>(url, body, { headers: headers });
  }

  delete(route: string, user_id) {
    const url = `${this.urlApi}${route}`;
    //Se obtiene el token de local storage
    const token = localStorage.getItem('token');
    // Se añade el token en los headers de las peticiones

    const options = {
      headers: new HttpHeaders({
      'Authorization': 'Token '+token,
        'Content-Type': 'application/json'}),
      body: {
        "user": {
            "id": user_id
        }
    },
    };
    console.log(user_id)    
    return this.http.delete<any>(url, options);
  }

  getUsers() {
    console.log('hola ne serivios')
    return this.get('userList/')
      .pipe(map(data => data));
  }

  createUser(body) {
    return this.post('userList/', body)
      .pipe(map(data => data));
  }

  changeUser(body) {
    return this.put('userDetail/', body)
      .pipe(map(data => data));
  }

  deleteUser(user_id) {
    console.log("user_id ", user_id)
    return this.delete('userDetail/', user_id)
      .pipe(map(data => data));
  }
}
