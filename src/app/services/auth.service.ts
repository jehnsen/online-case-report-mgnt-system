import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8000/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(credentials): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/login`, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/register`, {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password
    }, httpOptions);
  }

}
