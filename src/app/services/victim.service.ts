import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const urlEndpoint = `${environment.apiUrl}/api/victims`
@Injectable({
    providedIn: 'root'
})
export class VictimService {

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
        return throwError(errorMessage);
    }

    public get(): Observable<any> {
        return this.httpClient.get(`${urlEndpoint}`).pipe(catchError(this.handleError));
    }

    public getByCaseId(caseId): Observable<any> {
        return this.httpClient.get(`${urlEndpoint}/case/${caseId}`).pipe(catchError(this.handleError));
    }

    public create(data): Observable<any> {

        return this.httpClient.post(`${urlEndpoint}`, {
            case_id: data.case_id,
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            address: data.address,
            age: data.age,
            gender: data.gender,
            civil_status: data.civil_status,
            status: 0
        }, httpOptions).pipe(catchError(this.handleError));
    }

    public update(data): Observable<any> {
        return this.httpClient.put(`${urlEndpoint}/${data.id}`, {
            case_id: data.case_id,
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            address: data.address,
            age: data.age,
            gender: data.gender,
            civil_status: data.civil_status
        }, httpOptions)
            .pipe(catchError(this.handleError));
    }

    public getById(id): Observable<any> {
        return this.httpClient.get(`${urlEndpoint}/${id}`, httpOptions)
            .pipe(catchError(this.handleError));
    }

    public delete(id): Observable<any> {
        return this.httpClient.delete(`${urlEndpoint}/${id}`, httpOptions)
            .pipe(catchError(this.handleError));
    }
}
