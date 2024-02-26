import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../../model/services-information/content';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrlGeneral;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  createHeaders(cookie: string) {
    return new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Authorization': cookie});
  }
  
  getUserDataComplete(cookie: string, content: Content): Observable<any> {
    console.log(baseUrl + 'getuserdatacomplete');
    const httpHeaders: HttpHeaders = this.createHeaders(cookie);
    return this.http.post<any>(baseUrl + 'getuserdatacomplete', content, {headers: httpHeaders,observe: 'response'});
  }

  addDetailInformarionUser(cookie: string, content: Content): Observable<any> {
    console.log(baseUrl + 'adddetailinformarionUser');
    const httpHeaders: HttpHeaders = this.createHeaders(cookie);
    return this.http.post<any>(baseUrl + 'adddetailinformarionUser', content, {headers: httpHeaders,observe: 'response'});
  }
}
