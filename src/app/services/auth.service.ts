import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(credentials): Observable<any> {
    return this.httpClient.post(`http://54.211.177.170:8000/api/login`, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/api/register`, {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password
    }, httpOptions);
  }

}
