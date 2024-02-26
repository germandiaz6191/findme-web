import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../../model/services-information/content';
import { environment } from '../../../environments/environment';
import { LostObjectsDto } from 'src/app/model/objects/lostObjectsDto';

const baseUrl = environment.baseUrlGeneral;

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  lostObjects: LostObjectsDto = new LostObjectsDto();

  constructor(private http: HttpClient) { }

  createHeaders(cookie: string) {
    return new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Authorization': cookie});
  }

  getLostObject() {
    return this.lostObjects;
  }

  setLostObject(lostObjects: LostObjectsDto) {
    this.lostObjects = lostObjects;
  }

  getObjects(cookie: string, content: Content): Observable<any> {
    console.log(baseUrl + 'getobjects');
    const httpHeaders: HttpHeaders = this.createHeaders(cookie);
    return this.http.post<any>(baseUrl + 'getobjects', content, {headers: httpHeaders,observe: 'response'});
  }

  addSearch(cookie: string, content: Content): Observable<any> {
    console.log(baseUrl + 'addSearch');
    const httpHeaders: HttpHeaders = this.createHeaders(cookie);
    return this.http.post<any>(baseUrl + 'addSearch', content, {headers: httpHeaders,observe: 'response'});
  }

  addObject(cookie: string, content: Content): Observable<any> {
    console.log(baseUrl + 'addobject');
    const httpHeaders: HttpHeaders = this.createHeaders(cookie);
    return this.http.post<any>(baseUrl + 'addobject', content, {headers: httpHeaders,observe: 'response'});
  }

  changeObjectStatus(cookie: string, content: Content): Observable<any> {
    console.log(baseUrl + 'changeobjectstatus');
    const httpHeaders: HttpHeaders = this.createHeaders(cookie);
    return this.http.post<any>(baseUrl + 'changeobjectstatus', content, {headers: httpHeaders,observe: 'response'});
  }

}
