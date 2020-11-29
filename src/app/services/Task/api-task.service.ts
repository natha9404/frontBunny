import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiTaskService {
  urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.urlTask;
  }

  get(route: string) {
    const url = `${this.urlApi}${route}`;
    //Se obtiene el token de local storage
    const token = localStorage.getItem('access_token');
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
    const headers = {
      'Authorization': 'Token 114ad11a717654f91806fa9247745389edadb9ce',
      'Content-Type': 'application/json'
    }  
    return this.http.put<any>(url, body, { headers: headers });
  }

  delete(route: string, body) {
    const url = `${this.urlApi}${route}`;
    //Se obtiene el token de local storage
    const token = localStorage.getItem('access_token');
    // Se añade el token en los headers de las peticiones
    const headers = {
      'Authorization': 'Token 114ad11a717654f91806fa9247745389edadb9ce',
      'Content-Type': 'application/json'
    }
    return this.http.delete<any>(url, { headers: headers, params: body });
  }

  getTasks() {
    return this.get('taskList/')
      .pipe(map(data => data));
  }

  createTask(body){
    return this.post('taskList/',body)
      .pipe( map( data => data));
  }

  changeTask(body){
    return this.post('taskDetail/',body)
      .pipe( map( data => data));
  }
  


}
