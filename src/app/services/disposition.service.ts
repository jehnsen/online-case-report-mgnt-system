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
export class DispositionService {

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

  public getDispositions(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/disposition`).pipe(catchError(this.handleError));
  }

  public create(data): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/disposition`, { description:  data.dispositionName }, httpOptions)
    .pipe(catchError(this.handleError));
  }

  update(data: any, id: number){
    return this.httpClient.put(`${environment.apiUrl}/api/disposition/${id}`, { description:  data.dispositionName }, httpOptions)
  }

  public delete(id): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/disposition/${id}`, httpOptions)
    .pipe(catchError(this.handleError));
  }

}
