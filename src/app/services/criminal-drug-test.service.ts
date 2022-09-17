import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders   } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CriminalDrugTestService {

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage: any;;
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = { message: error.error.message };
    } else {
      // Server-side errors
      errorMessage = { code: error.status, message: error.message };
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  get(): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/api/drugtest`).pipe(catchError(this.handleError));
  }

  public create(payload): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/drugtest`, payload, httpOptions)
      .pipe(catchError(this.handleError));
  }

  update(id: number, payload: any){
    return this.httpClient.put(`${environment.apiUrl}/api/drugtest/${id}`, payload, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getById(id: number){
    return this.httpClient.get(`${environment.apiUrl}/api/drugtest/${id}`).pipe(catchError(this.handleError));
  }

  delete(id: number){
    return this.httpClient.delete(`${environment.apiUrl}/api/drugtest/${id}`).pipe(catchError(this.handleError));
  }
}
