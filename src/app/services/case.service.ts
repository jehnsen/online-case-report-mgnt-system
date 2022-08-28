import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders   } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private API_SERVER = 'http://localhost:8000/api/incident';

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

  public getCases(): Observable<any> {
    return this.httpClient.get(`${this.API_SERVER}`).pipe(catchError(this.handleError));
  }

  public create(caseData): Observable<any> {
    return this.httpClient.post(`${this.API_SERVER}`, {
      firstname:    caseData.personalInfo.firstname,
      middlename:   caseData.personalInfo.middlename,
      lastname:     caseData.personalInfo.lastname,
      address:      caseData.personalInfo.address,
      age:          caseData.personalInfo.age,
      gender:       caseData.personalInfo.gender,
      birthdate:    caseData.personalInfo.birthdate,
      civil_status: caseData.personalInfo.civilStatus
    }, httpOptions)
    .pipe(catchError(this.handleError));
  }

}
