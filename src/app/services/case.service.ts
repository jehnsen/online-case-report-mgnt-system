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

  public create(data): Observable<any> {
    console.log(data)
    return this.httpClient.post(`${this.API_SERVER}`, {
      case_no:        data.caseNo,
      case_nature:    data.caseNature,
      investigator:   data.investigator,
      requesting_party:     data.requestingParty,
      incident_title:       data.incidentTitle,
      incident_description: data.incidentDescription,
      disposition:    data.disposition,
      incident_time:  data.incidentTime,
      location:       data.location,
      victim:         data.victimName,
      suspect:        data.suspectName,
      incident_date:  JSON.stringify(data.dtpo.incidentDate),
      evidences:      data.evidences,
      status: 1
    }, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getById(id: number): Observable<any> {
    return this.httpClient.get(`${this.API_SERVER}/${id}`).pipe(catchError(this.handleError));
  }

}