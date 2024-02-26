import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrlIp;

@Injectable({
  providedIn: 'root'
})
export class IpClientService {

  constructor(private http: HttpClient) { }

  getIp(): Observable<any> {
    //return this.http.get<any>('https://exito.splunkcloud.com:8089/services/search/jobs');
    return this.http.get<any>(baseUrl);
  }
}
