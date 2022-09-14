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

  public getCases(division): Observable<any> {
    return this.httpClient.get(this.URL_ENDPOINT).pipe(catchError(this.handleError));
  }

  public create(data): Observable<any> {
    // console.log(data)
    let newEvidencesArray = []
    data.evidences.map(m => newEvidencesArray.push(m.description))
    return this.httpClient.post(this.URL_ENDPOINT, {
      division:       data.division,
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
      chassis_no:     data.chassisNo,
      engine_no:      data.engineNo,
      incident_date:  data.incidentDate,
      evidences:      newEvidencesArray,
      reported_by:    data.reportedBy,
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

  public getByCaseNo(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL_ENDPOINT}/case/case-number/${id}`).pipe(catchError(this.handleError));
  }

  public getEvidencesByCaseId(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL_ENDPOINT}/evidence/${id}`).pipe(catchError(this.handleError));
  }

  public insertEvidenceDuringUpdate(data): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/evidence`, {
      case_id:        data.case_id,
      description:    data.description
    }, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public deleteEvidence(id): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/evidence/${id}`, httpOptions)
    .pipe(catchError(this.handleError));
  } 

}