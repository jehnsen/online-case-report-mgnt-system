import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders   } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { retry, catchError, share } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FirearminventoryService {

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
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getInvetory(): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/api/firearms`).pipe(catchError(this.handleError)).pipe(share());
  }

  getByCaseId(caseId: number): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/api/firearms/case/${caseId}`).pipe(catchError(this.handleError)).pipe(share());
  }

  create(payload): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/firearms`, payload, httpOptions)
      .pipe(catchError(this.handleError));
  }

  update(id: number, payload: any): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/api/firearms/${id}`, payload, httpOptions)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/firearms/${id}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

}
