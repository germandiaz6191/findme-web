import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../../model/services-information/content';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrlGeneral;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  createHeaders(cookie: string) {
    return new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Authorization': cookie});
  }

  getCountriesAndDepartments(cookie: string, content: Content): Observable<any> {
    console.log(baseUrl + 'getdepartmentsbycountry');
    const httpHeaders: HttpHeaders = this.createHeaders(cookie);
    return this.http.post<any>(baseUrl + 'getdepartmentsbycountry', content, {headers: httpHeaders,observe: 'response'});
  }

  getCitiesAndSector(cookie: string, content: Content): Observable<any> {
    console.log(baseUrl + 'getcitiesandsector');
    const httpHeaders: HttpHeaders = this.createHeaders(cookie);
    return this.http.post<any>(baseUrl + 'getcitiesandsector', content, {headers: httpHeaders,observe: 'response'});
  }

  getSectorsByCities(cookie: string, content: Content): Observable<any> {
    console.log(baseUrl + 'getsectorsbycities');
    const httpHeaders: HttpHeaders = this.createHeaders(cookie);
    return this.http.post<any>(baseUrl + 'getsectorsbycities', content, {headers: httpHeaders,observe: 'response'});
  }
}
