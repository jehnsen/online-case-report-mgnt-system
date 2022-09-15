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
export class CategoryService {

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
    return this.httpClient.get(`${environment.apiUrl}/api/category`).pipe(catchError(this.handleError));
  }

  public create(data): Observable<any> {
    const payload = {
      description:  data.categoryDescription,
      division:     data.division
    }
    return this.httpClient.post(`${environment.apiUrl}/api/category`, payload, httpOptions)
    .pipe(catchError(this.handleError));
  }

  update(data: any, id: number){
    const payload = {
      description:  data.categoryDescription,
      division:     data.division
    }
    return this.httpClient.put(`${environment.apiUrl}/api/category/${id}`, payload, httpOptions)
  }

  public delete(id): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/category/${id}`, httpOptions)
    .pipe(catchError(this.handleError));
  }

}
