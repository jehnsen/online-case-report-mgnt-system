import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders   } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RequesterService {

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nServer Message: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public get(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/requester`).pipe(catchError(this.handleError));
  }

  public create(data): Observable<any> {
    console.log(data)
    return this.httpClient.post(`${environment.apiUrl}/api/requester`, {
      name: data.name,
      address: data.address
    }, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public update(data): Observable<any> {
    console.log(data)
    return this.httpClient.put(`${environment.apiUrl}/api/requester/${data.id}`, {
      name: data.name,
      address: data.address
    }, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getById(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/requester/${id}`, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public delete(id): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/requester/${id}`, httpOptions)
    .pipe(catchError(this.handleError));
  }
}
