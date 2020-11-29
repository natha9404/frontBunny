import { HttpClient } from '@angular/common/http';
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
    //const token = localStorage.getItem('access_token');
    // Se añade el token en los headers de las peticiones
    const headers = {
      'Authorization': 'Token 114ad11a717654f91806fa9247745389edadb9ce',
      'Content-Type': 'application/json'
    }
    return this.http.get<any>(url, { headers: headers });
  }

  post(route: string, body) {
    const url = `${this.urlApi}${route}`;
    //Se obtiene el token de local storage
    const token = localStorage.getItem('access_token');
    // Se añade el token en los headers de las peticiones
    const headers = {
      'Authorization': 'Token 114ad11a717654f91806fa9247745389edadb9ce',
      'Content-Type': 'application/json'
    }
    return this.http.post<any>(url, body, { headers: headers });
  }

  put(route: string, body) {
    const url = `${this.urlApi}${route}`;
    //Se obtiene el token de local storage
    const token = localStorage.getItem('access_token');
    // Se añade el token en los headers de las peticiones
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.put<any>(url, body, { headers: headers });
  }

  delete(route: string, body) {
    const url = `${this.urlApi}${route}`;
    //Se obtiene el token de local storage
    const token = localStorage.getItem('access_token');
    // Se añade el token en los headers de las peticiones
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(url, { headers: headers, params: body });
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
    return this.post('userDetail', body)
      .pipe(map(data => data));
  }
}
