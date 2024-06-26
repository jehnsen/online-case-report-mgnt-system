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
export class FileService {

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
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getFiles(caseId): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/file/case/${caseId}`).pipe(catchError(this.handleError));
  }

  public create(data): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/file`, {
      case_id:  data.caseId,
      filename: data.filename,
      filetype: data.filetype
    }, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public delete(id): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/file/${id}`, httpOptions)
    .pipe(catchError(this.handleError));
  }

  upload(data){
    return this.httpClient.post(`${environment.apiUrl}/api/image-upload`, data, {})
  }

  updateFileByCaseId(caseId: number): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/api/file/case/${caseId}`, {}, httpOptions).pipe(catchError(this.handleError))
  }

}