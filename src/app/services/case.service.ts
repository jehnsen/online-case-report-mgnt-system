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
export class CaseService {
  private URL_ENDPOINT = `${environment.apiUrl}/api/incident`;

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
    return this.httpClient.get(this.URL_ENDPOINT).pipe(catchError(this.handleError));
  }

  public create(data): Observable<any> {
    console.log(data)
    return this.httpClient.post(this.URL_ENDPOINT, {
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
      incident_date:  data.incidentDate,
      evidences:      data.evidences,
      status: 1
    }, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public update(data, id): Observable<any> {

    return this.httpClient.put(`${this.URL_ENDPOINT}/${id}`, {
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
      incident_date:  data.incidentDate,
      reported_by:    data.reportedBy
    }, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public delete(id): Observable<any> {
    return this.httpClient.delete(`${this.URL_ENDPOINT}/${id}`, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getById(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL_ENDPOINT}/${id}`).pipe(catchError(this.handleError));
  }

}